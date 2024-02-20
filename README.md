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

Реализация данного приложение была разработана по архитектуре MVP, состоящей из компонентов:

- **Model** - модель данных;
- **View** - модель отображения интерфейса;
- **Presenter** - связующая модель;

## Базовые типы, интерфейсы и классы

**Типы**
---
- ``ApiListResponse<Type>`` - ответ списка Апи
- ``ApiPostMethods`` - пост методы Апи
- ``EventName`` - имя события
- ``Subscriber`` - подписчик
- ``EmitterEvent`` - событие выбора. Принимает EventName и данные 

**Интерфейсы**
---
- ``IEvents`` - содержит методы on, emit, trigger

- ``IAppState `` - интерфейс данных приложения

```
interface IAppState {
    cardList: IProduct[];
    basket: IProduct[];
    preview: string | null;
    order: IOrder | null;
}   
```

**Классы**
---
1. Класс **Api** - класс по работе с Апи. Это абстрактный класс (не имеющий экземпляров), его наследником является класс **WebLarekApi**.

   **Поля:**

   - ``baseUrl:string (только для чтения)``
   - ``options:RequestInit (зашищенный)``

   **Методы:**

   - ``handleResponse(response: Response): Promise<object>`` (зашищенный) - обработчик ответа сервера. Принимает ответ и возвращает его, если ответа нет возвращает ошибку.
   - ``get(uri: string)`` - примает путь и возвращает ответ сервера.
   - ``post(uri: string, data: object, method: ApiPostMethods = 'POST')`` - примает путь и данные, возвращает ответ сервера.

2. Класс **EventEmitter** - брокер событий, имплементируется от IEvents. Данный класс выполняет роль Presenterа в системе MVP. Имеет следующие поля и методы

   **Поля:**

   - ``events: Map<EventName, Set<Subscriber>>``

   **Методы:**

   - ``on<T extends object>(eventName: EventName, callback: (event: T) => void)`` - принимает событие и колбек функцию, если событие нет создает его.
   - ``off(eventName: EventName, callback: Subscriber)`` -  принимает событие и колбек функцию, удаляет подписку на событие. Если подписки нет, удаляет событие.
   - ``emit<T extends object>(eventName: string, data?: T)`` - принимает событие и данные, инициирует событие с данными.
   - ``onAll(callback: (event: EmitterEvent) => void)`` - принимает колбек, подписывает на все событие.
   - ``offAll()`` - сбрасывает все обработчики.
   - ``trigger<T extends object>(eventName: string, context?: Partial<T>)`` - принимает событие, возвращает функцию триггера генерирующий событие при вызове.

3. Класс **Component** - абстрактный класс, нужен для работы с DOM элементами. От этого класса наследуют все классы отображения(View): **Page**, **Card**, **Form**, **Basket**,  **SuccessfulForm**, **Modal**. Имеет следующие поля и методы

   **Методы:**

   - ``toggleClass(element: HTMLElement, className: string, force?: boolean)`` - переключает классы.
   - ``setText(element: HTMLElement, value: unknown)`` -  устанавливает текстовое поле.
   - ``setDisabled(element: HTMLElement, state: boolean)`` - меняет статус блокировки.
   - ``setHidden(element: HTMLElement)`` - скрывает элемент.
   - ``setVisible(element: HTMLElement)`` - показывает элемент.
   - ``setImage(element: HTMLImageElement, src: string, alt?: string)`` - устанавливает изображение с альтернативным текстом.
   - ``render(data?: Partial): HTMLElement`` - возвращает корневой DOM элемент.

4. Класс **Model** - абстрактный класс модели данных, его наследником является класс **AppState**.

   **Методы:**

   - ``emitChanges(event: string, payload?: object)`` - сообщает, что модель изменилась.

5. Класс **AppState** - класс управления состоянием проекта (списка карточек, корзины, заказов и форм). Наследуется от класса Model

   **Поля:**

   - ``_cardList(зашищенный)`` - Card[];
   - ``_basket(зашищенный)``- Card[];
   - ``_order(зашищенный)``- IOrder;
   - ``_preview(зашищенный)``- string | null;
   - ``_formErrors(зашищенный)``- FormErrors;

   **Методы:**

   - ``setCatalog`` - устанавливает список карточек.
   - ``setPreview`` - устанавливает предпросомотр карточек.
   - ``addToBasket`` - добавляет товар в корзину.
   - ``removeFromBasket`` - удаляет товар из корзины.
   - ``updateBasket`` - обновляет состояние корзины.
   - ``clearBasket`` - очищает корзину.
   - ``setDeliveryField`` - устанавливает значения данные доставки.
   - ``setContactField`` - устанавливает значения данные контактов.
   - ``validateDelivery `` - валидация формы доставки.
   - ``validateContact`` - валидация формы контактов.

6. Класс **WebLarekApi** - класс, нужен для работы с DOM элементами. Наследуется от класса Api и имеет следующие поля и методы. 

   **Поля:**

   - ``cdn(string)`` - Базовый URL
   
   **Конструктор:**

   constructor(cdn: string, baseUrl: string, options?: RequestInit)

   **Методы:**

   - ``getCardList(): Promise<ICard[]>`` - получение списка всех карточек с сервера
   - ``getCardItem(id: string): Promise<ICard>`` - получение данных карточки по id
   - ``orderCard(order: IOrder): Promise<IOrderResult>`` - Получение списка всех карточек с сервера

## View компоненты и данные

**Типы**
---
- ``PaymentMethod`` - тип выбора способа оплаты
- ``FormErrors = Partial<Record<keyof IOrder, string>>`` - тип ошибки формы

**Интерфейсы**
---
- ``IPage`` - интерфейс главной страницы

```
interface IPage {
    counterBasket: number;
    cardList: HTMLElement[];
    block: boolean;
}
```
- ``ICard`` - интерфейс карточки товара. Данные получаем с сервера

```
interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```
- ``IBasket `` - интерфейс корзины

```
interface IBasket {
	item: HTMLElement[];
	total: number;
}
```
- ``IBasketCardList `` - интерфейс корзины со списком покупок, расширяется  от IBasket

```
interface IBasketCardList extends ICard{
	index: number;
}
```
- ``IFormValid `` - интерфейс валидации формы

```
interface IFormValid {
	valid: boolean;
	errors: string[];
}
```
- ``IOrderForm `` - интерфейс модального окна с вводом адреса расширяется от IFormValid

```
interface IOrderForm extends IFormValid {
	paymentMethod: PaymentMethod;
	address: string;
	sending: (state: Partial<IOrderForm> & IFormValid) => HTMLElement;
}
```
- ``IContactsForm `` - интерфейс модального окна с вводом почты и телефона расширяется от IFormValid

```
interface IContactsForm  extends IFormValid {
	email: string;
   phone: string;
	sending: (state: Partial<IContactsForm > & IFormValid) => HTMLElement;
}
```
- ``ISuccessfulForm `` - интерфейс модального окна с завершением заказа

```
interface ISuccessfulForm {
	total: number;
   id: string;
}
```

- ``IOrder`` - интерфейс всех данных в заказе

```
interface IOrder extends IOrderForm, IContactsForm {
    total: number;
    items: string[];
}
```
- ``IOrderResult`` - интерфейс ответа сервена на заказ

```
interface IOrderResult {
    id: string;
    total: number;
}
```
- ``IModalData`` - интерфейс данных в модальном окне

```
interface IModalData {
    content: HTMLElement;
}    
```

- ``IActions  `` - передоваемые действия

```
interface IActions {
    onClick: (event: MouseEvent) => void;
} 
```

- ``ISuccessActions  `` - передоваемые действия успешного заказа

```
interface ISuccessActions {
    onClick: () => void;
}
``` 

**Классы** описание классов View, наследующих от класса **Component**
---
1. Класс **Page** - формирование главной страницы. Наследуется от класса  Component

   **Поля:**

   - ``_counterBasket: (зашищенный)`` - HTMLElement;
   - ``_cardList (зашищенный)``- HTMLElement;
   - ``_wrapper (зашищенный)``- HTMLImageElement;
   - ``_basket (зашищенный)``- HTMLElement;
   
   **Конструктор:**

   constructor(container: HTMLElement, events: IEvents)


   **Методы:**

   - ``set counter(value: number | null)`` - изменить счетчик товара в корзине на главной странице.
   - ``set cardList(items: HTMLElement[])`` - вывести список карточек.
   - ``set locked(value: boolean)`` - установка или снятие блока прокрутки страницы.

2. Класс **Card** - описание карточки товара. Наследуется от класса Component

   **Поля:**

   - ``_index (зашищенный)`` - HTMLElement;
   - ``_category (зашищенный)`` - HTMLElement;
   - ``_title (зашищенный)``- HTMLElement;
   - ``_image (зашищенный)``- HTMLImageElement;
   - ``_description (зашищенный)``- HTMLElement;
   - ``_price (зашищенный)``- HTMLElement;
   - ``_button (зашищенный)``- HTMLButtonElement;
   - ``_buttonTitle (зашищенный)``- HTMLButtonElement;

    **Конструктор:**

   constructor(container: HTMLElement, actions?: IActions)

   **Методы:**

   - ``set id(value: string)`` - принимает строку с сервера, устанавливает id.
   - ``set title(value: string)`` - принимает строку с сервера, устанавливает заголовок.
   - ``set category(value: string)`` - принимает строку с сервера, устанавливает категорию.
   - ``set description(value: string)`` - принимает строку с сервера, устанавливает описание.
   - ``set image(value: string)`` - принимает строку с сервера, устанавливает изображение.
   - ``get id(): string `` - получить id.
   - ``get title(): string`` - получить название.
   - ``get price(): number`` - получить цену.
   - ``disablePriceButton`` - делает кнопку не активной, если нет цены.
   - ``set buttonTitle`` - устанавливает textContent кнопки.   

3. Класс **Basket** - описание корзины. Наследует класс Component

   **Поля:**

   - ``_list`` - HTMLElement;
   - ``_button``- HTMLButtonElement;;
   - ``_total``- HTMLElement;

   **Конструктор:**

   constructor(container: HTMLElement, events: EventEmitter)

   **Методы:**

   - ``set items(items: HTMLElement[])`` - вставить данные в корзину.
   - ``set total(price: number)`` - посчитать общую стоимость товара.
   - ``set selected(items: Card[])`` - проверить наличие карточки в корзине.

4. Класс **Form** - класс для работы с формами. Наследуется от класса Component

   **Поля:**

   - ``_onlineCard`` - HTMLButtonElement;
   - ``_oflineCash``- HTMLButtonElement;;
   - ``_total``- HTMLElement;

   **Конструктор:**

   constructor(container: HTMLFormElement, events: IEvents)

   **Методы:**

   - ``InInputChange`` -обработчик событий ввода.
   - ``set valid`` - контролирует активность кнопки отправки в зависимости от валидности формы.
   - ``set errors`` - устанавливает и отображает ошибки валидации формы.
   - ``render`` - показывает состояние формы.

5. Класс **OrderForm** - отображение модального окна заполнения адреса. Наследует класс Form

   **Поля:**

   - ``_onlineCard`` - HTMLButtonElement;
   - ``_oflineCash``- HTMLButtonElement;;
   - ``_total``- HTMLElement;

   **Конструктор:**

   constructor(container: HTMLFormElement, events: IEvents, actions?: IActions)

   **Методы:**

   - ``toggleButtons`` - переключение между кнопками.
   - ``set address`` - ввод адреса доставки.
     
6. Класс **ContactsForm** - отображение модального окна заполнения почты и телефона. Наследует класс Form

   **Поля:**

   - ``_onlineCard`` - HTMLButtonElement;
   - ``_oflineCash``- HTMLButtonElement;;
   - ``_total``- HTMLElement;

   **Конструктор:**

   constructor(container: HTMLFormElement, events: IEvents)

   **Методы:**

   - ``set phone`` - ввод телефона.
   - ``set email`` - ввод почты.

7. Класс **SuccessfulForm** - отображение модального удачного заказа. Наследуется от  класс Component

   **Поля:**

   - ``close`` -  HTMLElement;
   - ``_total``- HTMLElement;

   **Конструктор:**

   constructor(container: HTMLElement, actions: ISuccessActions)

   **Методы:**

   - ``set total`` - устанавливет текст в элемент. 

8. Класс **Modal** - класс для работы с модальным окном. Наследуется от класса Component

   **Конструктор:**

   constructor(container: HTMLElement, events: IEvents)

   **Методы:**

   - ``content`` - определяет контент показа в модальном окне.
   - ``open`` - открывает модальное окно.
   - ``close`` - закрывает модальное окно.
   - ``render`` - рендерит модальное окно.

## События:

**Карточка**
---
- ``card:select`` - выбор карточки;
- ``card:add`` - добавление карточки в корзину;
- ``card:delete`` - удаление карточки из корзины;
- ``preview:changed`` - открытие окна карточки;

**Корзина**
---
- ``basket:changed`` - изменение корзины;
- ``counter:changed`` - изменение счетчика;
- ``basket:open`` - открытие модального окна корзины;

**Формы заказа**
---
- ``order:open`` - открытие модального окна адреса доставки;
- ``payment:toggle`` - изменение способа оплаты;
- ``/^order\..*:change/`` - изменение поля формы доставки;
- ``delivery:ready`` - готовность формы доставки;
- ``contact:ready`` - готовность формы контактов;
- ``order:submit`` - отправка формы доставки;
- ``contacts:submit`` - отправка формы контактов;
- ``formErrors:change`` - списки ошибок;

**Модальное окно**
---
- ``modal:open`` - открытие модального окна;
- ``modal:close`` - закрытие модального окна;