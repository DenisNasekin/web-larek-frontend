import './scss/styles.scss';//Импорт стилей
import {API_URL, CDN_URL} from './utils/constants';//Импорт данных сервера
import {EventEmitter} from './components/base/events';//Импорт слушателя
import {WebLarekApi} from './components/WebLarekApi';//Импорт апи
import {cloneTemplate, ensureElement } from './utils/utils';//Импорт утилит клонирования темплэйта и элемента обеспечения
import {AppState, CardItem} from './components/AppState';//Импорт бизнес логики
import {Page} from './components/page';//Импорт главной страницы
import {Card, CardPreview, CardBasket} from './components/card';//Импорт карточки
import {Modal} from './components/modal';//Импорт модального окна
import {Basket} from './components/basket';//Импорт корзины
import {Order} from './components/orderForm';//Импорт формы адреса
import {Contacts} from './components/contantForm';//Импорт формы данных
import {Success} from './components/success';//Импорт успешного заказа
import {IOrderForm} from './types';//Импорт интерфейсов форм

const events = new EventEmitter();//Создаем переменную управления событиями
const api = new WebLarekApi(CDN_URL, API_URL);//Создаем переменную управления Апи

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');//Шаблон каталога главной страницы
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');//Шаблон превью карточки
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');//Шаблон корзины
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');//Шаблон карточек в корзине
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');//Шаблон формы контактов
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');//Шаблон формы заказа
const successTemplate = ensureElement<HTMLTemplateElement>('#success');//Шаблон формы успешного заказа

const appState = new AppState({}, events);//Создаем переменную модели данных

const page = new Page(document.body, events);//Создаем переменную главной страницы
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);//Создаем переменную модального окна
const basket = new Basket(cloneTemplate(basketTemplate), events);//Создаем переменную корзины
const delivery = new Order(cloneTemplate(orderTemplate), events);//Создаем переменную формы доставки
const contact = new Contacts(cloneTemplate(contactsTemplate), events);//Создаем переменную формы контактов

//Блокируем прокрутку страницы если открыто модальное окно
events.on('modal:open', () => {
    page.locked = true;
});

//Разблокируем прокрутку страницы если закрыто модальное окно
events.on('modal:close', () => {
    page.locked = false;
});

//Получение и отображение списка карточек
api.getCardList()
    .then(appState.setCatalog.bind(appState))
	.catch((err) => {
		console.log(err);
	});
events.on('items:changed', () => {
    page.catalog = appState.cardList.map((item) => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
        onClick: () => events.emit('card:select', item)
    });
    return card.render({
        category: item.category,
        title: item.title,
        image: item.image,
        price: item.price
        });
    });
});

//Получение данных и открытие превью карточки
events.on('card:select', (item: CardItem) => {
    appState.setPreview(item);
  });
events.on('preview:changed', (item: CardItem) => {
    const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit('card:add', item)
        });
    modal.render({
        content: card.render({
            title: item.title,
            image: item.image,
            description: item.description,
            price: item.price,
            category: item.category
        })
    });
});

//Добавление товара в заказ и корзину, обновление счетчика корзины на главной страницы
events.on('card:add', (item: CardItem) => {
    appState.addCardToBasket(item);
    appState.setCardToBasket(item);
    page.counter = appState.basketList.length;
    modal.close();
})

//Открытие корзины, отображение товаров и суммы заказа
events.on('basket:open', () => {
    basket.setDisabled(basket.button, appState.statusBasket);
    basket.total = appState.getTotal();
    let i = 1;
    basket.items = appState.basketList.map((item) => {
        const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
        onClick: () => events.emit('card:remove', item)
        });
        return card.render({
            title: item.title,
            price: item.price,
            index: i++
            });
    })
    modal.render({
        content: basket.render()
    })
})

//Удаление товара из корзины
events.on('card:remove', (item: CardItem) => {
    appState.deleteCardToBasket(item);
    appState.deleteCardFromOrder(item);
    page.counter = appState.basketList.length;
    basket.setDisabled(basket.button, appState.statusBasket);
    basket.total = appState.getTotal();
    let i = 1;
    basket.items = appState.basketList.map((item) => {
      const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
        onClick: () => events.emit('card:remove', item)
      });
      return card.render({
        index: i++,
        title: item.title,
        price: item.price
      });
    })
    modal.render({
      content: basket.render()
    })
})

//Открытие формы доставки и смена оплаты
events.on('order:open', () => {
	modal.render({
		content: delivery.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
	appState.order.items = appState.basket.map((item) => item.id);
});
events.on('payment:change', (item: HTMLButtonElement) => {
    appState.order.payment = item.name;
})

//Изменение поля ввода доставки
events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appState.setOrderField(data.field, data.value);
  });

//Валидация
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
    const { email, phone, address, payment } = errors;
    delivery.valid = !address && !payment;
    contact.valid = !email && !phone;
    delivery.errors = Object.values({address, payment}).filter(i => !!i).join('; ');
    contact.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
  })

//Отправляем данные доставки и открываем модальное окно контактов
events.on('order:submit', () => {
    appState.order.total = appState.getTotal()
    modal.render({
      content: contact.render({
        email: '',
        phone: '',
        valid: false,
        errors: []
      })
    });
})

//Изменение поля ввода контактов
events.on(/^contacts\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appState.setContactsField(data.field, data.value);
});

//Отправляем форму контактов и открываем окно с успешным заказом
events.on('contacts:submit', () => {
    api.orderCard(appState.order)
    .then((result) => {
        console.log(appState.order)
        const success = new Success(cloneTemplate(successTemplate), {
            onClick: () => {
                modal.close();
                appState.clearBasket();
                page.counter = appState.basketList.length;
            }
        });
      
        modal.render({
            content: success.render({
            total: appState.getTotal()
            })
        })
      })
    .catch(err => {console.error(err);})
});
