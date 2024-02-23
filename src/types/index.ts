interface IPage {
    counterBasket: number;
    cardList: HTMLElement[];
    block: boolean;
}

interface ICard {
	id?: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	button?: HTMLButtonElement;
}

interface IActions {
    onClick: (event: MouseEvent) => void;
}

interface IBasket {
	items: HTMLElement[];
	total: number;
}

interface IBasketCardList extends ICard{
	index: number;
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

interface IAppState {
    cardList: ICard[];
    basket: ICard[];
    preview: string | null;
    order: IOrder | null;
}

interface IModalData {
	content: HTMLElement;
}

export {IPage, ICard, IActions, ApiListResponse, IOrder, ISuccessfulForm, IAppState, FormErrors, IOrderForm, IContactsForm, IBasket, IFormValid, ISuccessActions, IModalData}