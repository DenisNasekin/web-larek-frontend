# Проектная работа "Веб-ларек"

Используемый стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Ключевые типы данных
```
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

```


