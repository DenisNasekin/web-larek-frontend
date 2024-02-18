/*Интерфейс данных карточки выгружаемых с сервера*/
interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

/*Интерфейс корзины со списком покупок*/
interface IBasketListItem {
	id: string;
	title: string;
	price: number;
}

/*Интерфейс валидации формы*/
interface IFormValid {
	valid: boolean;
	errors: string[];
}

/*Тип способа оплаты*/
type PaymentMethod = 'Онлайн' | 'При получение';


/*Интерфейс модального окна с вводом адреса*/
interface IOrderForm extends IFormValid {
	paymentMethod: PaymentMethod;
	address: string;
	sending: (state: Partial<IOrderForm> & IFormValid) => HTMLElement;
}

/*Интерфейс модального окна с вводом почты и телефона*/
interface IContactsForm  extends IFormValid {
	email: string;
    phone: string;
	sending: (state: Partial<IContactsForm > & IFormValid) => HTMLElement;
}

/*Интерфейс модального окна с удвчным оформлением заказа*/
interface ISuccessfulForm {
	total: number;
    id: string;
}