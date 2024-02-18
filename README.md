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
## Базовые типы и классы

- Тип ApiListResponse<Type> - ответ списка Апи
- ApiPostMethods = 'POST' | 'PUT' | 'DELETE' - пост методы Апи

- Класс **Api** - класс по работе с Апи имеет следующие поля и методы:
  - поле baseUrl:string (только для чтения)
  - поле options:RequestInit (зашищенный) 
  - метод handleResponse(response: Response): Promise<object> (зашищенный) - обработчик ответа сервера. Принимает ответ и возвращает его, если ответа нет возвращает ошибку
  - метод get(uri: string) - примает путь и возвращает ответ сервера
  - метод post(uri: string, data: object, method: ApiPostMethods = 'POST') - примает путь и данные, возвращает ответ сервера


```tsx




