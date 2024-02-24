import './scss/styles.scss';//Импорт стилей
import {Page} from './components/page';//Импорт главной страницы
import {cloneTemplate, ensureElement } from './utils/utils';//Импорт утилит клонирования темплэйта и элемента обеспечения
import {EventEmitter} from './components/base/events';//Импорт слушателя
import {AppState, CardItem} from './components/AppState';//Импорт бизнес логики
import {Card, CardPreview, CardBasket} from './components/card';//Импорт карточки
import {WebLarekApi} from './components/WebLarekApi';//Импорт апи
import {API_URL, CDN_URL} from './utils/constants';//Импорт данных сервера
import {IContactsForm, IOrder, IOrderForm, ICard} from './types';//Импорт интерфейсов форм
import {Modal} from './components/modal';//Импорт модального окна
import {Basket} from './components/basket';//Импорт корзины
import {Order} from './components/orderForm';//Импорт формы адреса
import {Contacts} from './components/contantForm';//Импорт формы данных
import {Success} from './components/successfulForm';//Импорт успешного заказа

const events = new EventEmitter();//Создаем переменную управления событиями
const api = new WebLarekApi(CDN_URL, API_URL);//Создаем переменную управления Апи

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');//Шаблон каталога главной страницы
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');//Шаблон превью карточки
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');//Шаблон корзины
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');//Шаблон карточки в корзине
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');//Шаблон формы контактов
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');//Шаблон формы заказа
const successTemplate = ensureElement<HTMLTemplateElement>('#success');//Шаблон формы успешного заказа

const appState = new AppState({}, events);//Создаем переменную модели данных

const page = new Page(document.body, events);//Создаем переменную главной страницы
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);//Создаем переменную модального окна
const basket = new Basket(cloneTemplate(basketTemplate), events);//Создаем переменную корзины
const delivery = new Order(cloneTemplate(orderTemplate), events, {onClick: (ev: Event) => events.emit('payment:toggle', ev.target),});//Создаем переменную формы доставки
const contact = new Contacts(cloneTemplate(contactsTemplate), events);//Создаем переменную формы контактов

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

