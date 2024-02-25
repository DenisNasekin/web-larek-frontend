import {Model} from './base/Model';
import {IAppState, IOrder, ICardItem, FormErrors, IOrderForm} from '../types'

 class AppState extends Model<IAppState> {
    cardList: CardItem[];
    basket: CardItem[] = [];
	order: IOrder = {address: '', payment: 'card', email: '', total: 0, phone: '',items: []};
    preview: string | null;
    formErrors: FormErrors = {};
    //Вывести каталог
    setCatalog(items: ICardItem[]) {
		this.cardList = items.map(item => new CardItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this.cardList });
    }
    //Вывести превью карточки
    setPreview(item: CardItem) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    //Добавить товар в заказ
	addCardToBasket(item: CardItem) {
		this.order.items.push(item.id)
	}
    //Вывести карточку в список окна корзины
	setCardToBasket(item: CardItem) {
		this.basket.push(item)
	}
    //Вернуть список товара в корзине
	get basketList(): CardItem[] {
		return this.basket
	}
    //Вернуть информацию по составу в корзине
	get statusBasket(): boolean {
		return this.basket.length === 0
	}
	//Вывести сумму заказа
	set total(value: number) {
		this.order.total = value;
	  }
    //Вернуть общую сумму заказов
	getTotal () {
		return  this.order.items.reduce((a, c) => a + this.cardList.find(it => it.id === c).price, 0)
	}
    //Удалить товар из корзины
	deleteCardToBasket(item: CardItem) {
		const index = this.basket.indexOf(item);
		if (index >= 0) {
		  this.basket.splice( index, 1 );
		}
	}
    //Удалить товар из заказа
	deleteCardFromOrder(item: CardItem) {
		const index = this.order.items.indexOf(item.id);
		if (index >= 0) {
		  this.order.items.splice( index, 1 );
		}
	}
	//Отчистка корзины
	clearBasket() {
		this.basket = []
		this.order.items = []
	}
    //Вывести данные введенные в поле доставки
	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		} 
	}
	//Вывести данные введенные в поле контакты
	setContactsField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
	
		if (this.validateContacts()) {
			this.events.emit('order:ready', this.order);
		} 
	  }
	//Валидация введенных данных
	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) errors.address = 'Необходимо указать адресс';
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
	//Валидация введенных формы котактов
	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) errors.email = 'Необходимо указать email';
		if (!this.order.phone) errors.phone = 'Необходимо указать телефон';
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	clearOrder() {
		this.order = {
			email: '',
			phone: '',
			payment: 'cash',
			address: '',
			items: [],
			total: 0,
		};
	}
}

 class CardItem extends Model<ICardItem> {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number | null;
}

export {AppState, CardItem}
