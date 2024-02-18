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

**Классы**
---
1. Класс **Api** - класс по работе с Апи имеет следующие поля и методы

   **Поля:**

   - ``baseUrl:string (только для чтения)``
   - ``options:RequestInit (зашищенный)``

   **Методы:**

   - ``handleResponse(response: Response): Promise<object>`` (зашищенный) - обработчик ответа сервера. Принимает ответ и возвращает его, если ответа нет возвращает ошибку.
   - ``get(uri: string)`` - примает путь и возвращает ответ сервера.
   - ``post(uri: string, data: object, method: ApiPostMethods = 'POST')`` - примает путь и данные, возвращает ответ сервера.

2. Класс **EventEmitter** - брокер событий, имплементируется от IEvents и имеет следующие поля и методы

   **Поля:**

   - ``events: Map<EventName, Set<Subscriber>>`` (абстрактный)

   **Методы:**

   - ``on<T extends object>(eventName: EventName, callback: (event: T) => void)`` - принимает событие и колбек функцию, если событие нет создает его.
   - ``off(eventName: EventName, callback: Subscriber)`` -  принимает событие и колбек функцию, удаляет подписку на событие. Если подписки нет, удаляет событие.
   - ``emit<T extends object>(eventName: string, data?: T)`` - принимает событие и данные, инициирует событие с данными.
   - ``onAll(callback: (event: EmitterEvent) => void)`` - принимает колбек, подписывает на все событие.
   - ``offAll()`` - сбрасывает все обработчики.
   - ``trigger<T extends object>(eventName: string, context?: Partial<T>)`` - принимает событие, возвращает функцию триггера генерирующий событие при вызове.

3. Класс **Component** - абстрактный класс, нужен для работы с DOM элементами и имеет следующие поля и методы

   **Методы:**

   - ``toggleClass(element: HTMLElement, className: string, force?: boolean)`` - переключает классы.
   - ``setText(element: HTMLElement, value: unknown)`` -  устанавливает текстовое поле.
   - ``setDisabled(element: HTMLElement, state: boolean)`` - меняет статус блокировки.
   - ``setHidden(element: HTMLElement)`` - скрывает элемент.
   - ``setVisible(element: HTMLElement)`` - показывает элемент.
   - ``setImage(element: HTMLImageElement, src: string, alt?: string)`` - устанавливает изображение с альтернативным текстом.
   - ``render(data?: Partial): HTMLElement`` - возвращает корневой DOM элемент.

4. Класс **Model** - абстрактный класс, нужен для работы с DOM элементами и имеет следующие поля и методы

   **Методы:**

   - ``emitChanges(event: string, payload?: object)`` - сообщает, что модель изменилась.
