interface IAppState {
    cardList: ICardItem[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
	total: string | number;
	loading: boolean;
}

interface IPage {
    cardList: HTMLElement[];
}

/*--Интерфейсы карточки--*/

//Интерфейс данных карточки с сервера
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

/*--Интерфейсы карточки--*/

//Интерфейс корзины
interface IBasket {
	items: HTMLElement[];
	total: number;
}


/*--Интерфейсы заказа--*/

//Интерфейс валидации формы
interface IFormValid {
	valid: boolean;
	errors: string[];
}
//Тип ошибки формы
type FormErrors = Partial<Record<keyof IOrder, string>>;
//Интерффейс формы заказа
interface IOrderForm {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}
//Интерфейс заказа
interface IOrder extends IOrderForm {
    items: string[];
}
//Интерфейс успешного заказа
interface ISuccessfulForm {
    [x: string]: any;
    id: string;
}
//Интерфейс формы успешного заказа
interface ISuccess {
	total: number;
  }
//Интерфейс события
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

export {IPage, ICardItem, ICard, ICardPreview, ICardBasket, IActions, ApiListResponse, IOrder, 
	ISuccessfulForm, IAppState, FormErrors, IOrderForm, IBasket, IFormValid, ISuccessActions, IModalData, ISuccess}