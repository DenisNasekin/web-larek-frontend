interface IAppState {
    cardList: ICardItem[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
	total: string | number;
	loading: boolean;
}

interface IPage {
    counterBasket: number;
    cardList: HTMLElement[];
    block: boolean;
}
//Интерфейс данных карточки с сервета
interface ICardItem {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	price: number | null;
  }
//Интерфейс карточки товара на главной страницы
interface ICard {
	category: string;
	title: string;
	description: string;
	image: string;
	price: number;
}
//Интерфейс карточки товара в превью
interface ICardPreview {
	text: string;
}  
//Интерфейс карточки в корзине
interface ICardBasket {
	index: number;
	title: string;
	price: number;
	
}  
//Интерфейс события
interface IActions {
    onClick: (event: MouseEvent) => void;
}

interface IBasket {
	items: HTMLElement[];
	total: number;
}

interface IFormValid {
	valid: boolean;
	errors: string[];
}

type FormErrors = Partial<Record<keyof IOrder, string>>;

interface IOrderForm {
	payment: string;
	address: string;
}

interface IOrder extends IOrderForm, IContactsForm {
    total: number;
    items: string[];
}

interface IContactsForm {
	email: string;
    phone: string;
}

interface ISuccessfulForm {
	total: number;
    id: string;
}

interface ISuccessActions {
	onClick: () => void;
}

type ApiListResponse<Type> = {
	total: number;
	items: Type[];
}



interface IModalData {
	content: HTMLElement;
}

export {IPage, ICardItem, ICard, ICardPreview, ICardBasket, IActions, ApiListResponse, IOrder, ISuccessfulForm, IAppState, FormErrors, IOrderForm, IContactsForm, IBasket, IFormValid, ISuccessActions, IModalData}