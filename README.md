# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
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
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

## Данные

#### IProduct 


Интерфейс описывает сущность  товара, который можно купить.

```typescript
interface IProduct {
  id: string; //Уникальный идентификатор товара
  description: string; // Описание товара
  image: string; // URL(ссылка) изобрадения товара
  title: string; // Название товара
  category: string; // Категория товара
  price: number | null; // Цена товара
}
```
#### IBuyer


 Интерфейс описывает сущность  данных покупателя, которые нужны для оформления и заказа товара.

```typescript
interface IBuyer {
    payment: 'card' | 'cash' | ''; // Способ оплаты тоара. Онлайн, наличкой и состояние когда ни чего еще не выбрано
    address: string; // Адрес доставки покупателя
    email: string; // Почта покупателя 
    phone: string // Номер телефона покупателя
}
```
#### IOrder

Интерфейс для объекта, отправляемого на сервер при оформлении заказ
```typescript 
export interface IOrder {
    payment: 'card' | 'cash' | '' | string,
    email: string,
    phone: string,
    address: string,
    total: number,
    items: string[]
}
```

## Модели данных

#### Класс Catalog
Catalog. Хранит массив всех товаров.
Хранит товар, выбранный для подробного отображения.

Поля класса:

```typescript
products: IProduct[]
selectedProduct: IProduct | null = null;
```

Методы класса:
```typescript
setProducts(products: IProduct[]) // сохранение массива товаров полученного в параметрах метода;
getProducts() // получение массива товаров из модели
getProductById(id: string) // получение одного товара по его id
setSelectedProduct(product: IProduct) //сохранение товара для подробного отображения
getSelectedProduct() //получение товара для подробного отображения
```

#### Класс ShoppingCart
ShoppingCart. Хранит массив товаров, выбранных покупателем для покупки.

Поля класса:
```typescript
productsSelectedForPurchase: IProduct[]
```

Методы класса:
```typescript
getProductsSelectedForPurchase () //получение массива товаров, которые находятся в корзине
addProduct(product: IProduct) // добавление товара, который был получен в параметре, в массив корзины
removeProduct(product: IProduct) // удаление товара
clearShoppingCart() // очистка корзины
getTotalPrice() // получение стоимости всех товаров в корзине
getTotalCountProductsInShoppingCart () // получение количества товаров в корзине
checkingProductInShoppingCart(id: string) // проверка наличия товара в корзине по его id, полученного в параметр метода.
```
#### Класс Buyer
Buyer. Хранит вид оплаты, адрес, email, телефон.

Поля класса:
```typescript
data: IBuyer = {
    payment: "",
    address: "",
    email: "",
    phone:""
   }
```

Методы класса:
```typescript
saveData(data: Partial<IBuyer>) // сохранение данных в модели с возможностью сохранить только одно значение
getDataBuyer() //получение всех данных покупателя
clearDataBuyer() // очистка данных покупателя
validate() // валидация данных, поле является валидным, если оно не пустое
```

## Слой коммуникации

#### Класс ApiWeblarek

Этот класс будет использовать композицию, чтобы выполнить запрос на сервер с помощью метода get класса Api и будет получать с сервера объект с массивом товаров.

Методы класса:
```typescript
async getProductList() // делает get запрос на эндпоинт /product/ и возвращает массив товаров
async createOrder(order: IOrder) // делает post запрос на эндпоинт /order/ и передаёт в него данные, полученные в параметрах метода
```
## Слой представления
### Архитектура компонентов представления

Компоненты представления организованы в строгой иерархии с четким разделением ответственности:

### Классы отвечающие за свой блок разметки компоненты UI

#### Класс Heder - шапка приложения с корзиной

Поля класса
```typescript
basketButton: HTMLButtonElement // Корзина
counterElement: HTMLElement //счетчик товаров в корзине
```
 Методы класса
 ```typescript
 set counter(value: number) // сеттер счетчика товаров в корзине
```

#### Класс Gallery - отображения товаров

Поля класса
```typescript
galleryElement: HTMLElement // область отоброжения товаров
```
Методы
```typescript
set catalog(items: HTMLElement[]) // добавление карточек
```
#### Класс Basket - корзина
Поля класса
```typescript
buttonElement: HTMLButtonElement // кнопка оформления заказа
priceElement: HTMLElement // общая стоимость товаров в корзине
listElement: HTMLElement // список товаров в корзине
```
Методы
```typescript
set list(list: HTMLElement[]) // сеттер добавления товаров в корзину
set price(price: number) // сеттер общей стоимости товаров
set button(active: boolean) // сеттер отвечает за состояние кнопки (активирована или деактивирована )
```
#### Класс Success - успешное оформление заказа
Поля класса
```typescript
buttonElement: HTMLButtonElement // кнопка с успешним оформлением
priceElement: HTMLElement // на какую сумму был оформлен заказ
```
Методы
```typescript
set price(price: number) // сеттер общей суммы заказа
```
### Переиспользуемые сущности 
### Abstract Класс Form 
```typescript
abstract class  Form<T> extends Component<T & IForm>
```
 Поля класса
```typescript
protected buttonElement: HTMLButtonElement // кнопка оформления
protected errors: HTMLElement // ошибки при валидации
```
Методы
```typescript
 set error(value: string | string[]) // сеттер ошибок
 set valid(isValid: boolean) // сеттер отвечает за состояние кнопки (активирована или деактивирована )
```
#### Класс FormOrder наследуется от Form
```typescript 
class FormOrder extends Form<IFormOrder>
```
Поля класса
```typescript
cardPaymentButton: HTMLButtonElement // кнопка оплаты картой
cashPaymentButton: HTMLButtonElement // кнопка оплаты наличными
addressInputElement: HTMLInputElement // поле ввода адреса
``` 
Методы
```typescript
private resetPaymentButtons(): void // метод для сброса состояния кнопок
private setPaymentMethod(method: 'card' | 'cash'): void // общий метод для установки способа оплаты
set address(value: string) // сеттер для адреса
set payment(value: string) // сеттер обновляет визуальное состояние кнопок выбора способа оплаты в форме
```
#### Класс FormContact наследуется от Form
```typescript 
class ContactForm extends Form<IContactsForm>
```
Поля класса
```typescript
emailInputElement: HTMLInputElement // поле ввода Email
phoneInputElement: HTMLInputElement // поле ввода номера телефона
```
Методы
```typescript
set email(value: string) // сеттер email
set phone(value: string) // сеттер телефона
```
### Abstract Класс Card
```typescript 
abstract class Card<T> extends Component<ICard & T>
```
Поля класса
```typescript
titleElement: HTMLElement // название товара
priceElement: HTMLElement // цена товара
```
Методы
```typescript
set title(name: string) // сеттер названия
set price(price: number | null) // сеттер цены
```
#### Класс CardBasket наследуется от Card
```typescript 
class CardBasket extends Card<ICardBasket>
```
Поля класса
```typescript
indexElement: HTMLElement // id товара
buttonElement: HTMLButtonElement // кнопка удаления товара из корзины 
```
Методы
```typescript
set index(value: number) // сеттер индекса
```
#### Класс CardCatalog наследуется от Card
```typescript 
class CardBasket extends Card<ICardBasket>
```
Поля класса
```typescript
indexElement: HTMLElement // id товара
buttonElement: HTMLButtonElement // кнопка удаления товара из корзины 
```
Методы
```typescript
set index(value: number) // сеттер индекса
```
#### Класс CardCPreview наследуется от Card
```typescript 
class class CardPreview extends Card<ICardPreview>
```
Поля класса
```typescript
imageElement: HTMLImageElement // картинка товара
categoryElement: HTMLElement // категоря товара
buttonElement:HTMLButtonElement // кнопка добавления товара в корзину
descriptionElement: HTMLElement // описание товара
```
Методы
```typescript
set image(value: string) // сеттер картинки
set category(value: string) // сеттер категории товара
set description(value: string) //  сеттер описания товара
set buttonText(value: string) // сеттер текста кнопки
set buttonDisabled(isDisabled: boolean) // сеттер состояния кнопки
```
## Событийная модель
### События, генерируемые в приложении
#### От Моделей данных:
 ```typescript
catalog:changed //  изменение каталога товаров - данные: { products: IProduct[] }
product:selected // выбор товара для просмотра - данные: { product: IProduct }
cart:changed // изменение содержимого корзины - данные: { items: IProduct[], total: number, count: number }
buyer:changed // изменение данных покупателя - данные: { data: IBuyer }
```
#### От Представлений:
```typescript
card:select // выбор карточки для просмотра
product:selected // действие с товаром в предпросмотре
basket:open // открытие корзины
order:open //  открытие формы заказа
form:changed // изменение данных в форме заказа
contacts:open //  переход к форме контактов
contacts:changed // изменение данных в форме контактов
order:submit // отправка заказа
modal:close // закрытие модального окна
```

## Слой Presenter (Презентер)
### Реализация в main.ts
Презентер реализован как набор обработчиков событий в основном файле приложения, что соответствует требованиям задания.
**Инициализация приложения**:
```typescript
// Создание брокера событий, API и моделей
const events = new EventEmitter();
const api = new ApiWeblarek();
const catalog = new Catalog(events);
const cart = new ShoppingCart(events);
const buyer = new Buyer(events);
```
