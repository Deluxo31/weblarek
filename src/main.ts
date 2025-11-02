import "./scss/styles.scss";
import { EventEmitter } from "./components/base/Events";
import { ApiWeblarek } from "./components/Models/ApiWeblarek";
import { Catalog } from "./components/Models/Catalog";
import { ShoppingCart } from "./components/Models/ShoppingCart";
import { Buyer } from "./components/Models/Buyer";
import { CardCatalog } from "./components/View/cards/CardCatalog";
import { CardPreview } from "./components/View/cards/CardPreview";
import { CardBasket } from "./components/View/cards/CardBasket";
import { Modal } from "./components/View/Modal";
import { Header } from "./components/View/Header";
import { Gallery } from "./components/View/Gallery";
import { ContactForm } from "./components/View/forms/FormContact";
import { FormOrder } from "./components/View/forms/FormOrder";
import { IProduct, IOrder, IBuyer } from "./types";
import { ensureElement, cloneTemplate } from "./utils/utils";
import { CDN_URL } from "./utils/constants";
import { Basket } from "./components/View/Basket";
import { Form } from "./components/View/forms/Form";
import { Success } from "./components/View/Success";

// Инициализация
const events = new EventEmitter();
const api = new ApiWeblarek();



const catalog = new Catalog(events);
const cart = new ShoppingCart(events);
const buyer = new Buyer(events);

const modalContainer = ensureElement<HTMLElement>("#modal-container");
const galleryContainer = ensureElement<HTMLElement>(".gallery");
const headerContainer = ensureElement<HTMLElement>(".header");

// Создаем компоненты
const modal = new Modal(events, modalContainer);
const header = new Header(events, headerContainer);
const gallery = new Gallery(galleryContainer);

// Шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");


api
  .getProductList()
  .then((data) => {
    catalog.setProducts(data.items);
    //console.log(catalog);
  })
  .catch((err) => console.log(err));

events.on(`modal:close`, () => {
  modal.close();
});
// Обработка изменения каталога
events.on("catalog:changed", () => {
  //console.log("catalog:changed - обработчик запущен");
  // const products = catalog.getProducts();
  //console.log('Товаров в каталоге:', products.length); // отладка
  const itemCards = catalog.getProducts().map((item) => {
    // console.log('Создаем карточку для:', item.title); // отладка
    const cardCatalog = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:select", item),
    });
    return cardCatalog.render({
      id: item.id,
      title: item.title,
      category: item.category,
      image: `${CDN_URL}${item.image}`,
      price: item.price,
    });
  });
  //console.log("Создано карточек:", itemCards.length); // отладка
  gallery.render({ catalog: itemCards });
});
// Просмотр товара
events.on("card:select", (item: IProduct) => {
  catalog.setSelectedProduct(item);
  events.emit("product:preview", item);
});
// Предпросмотр товара
events.on("product:preview", (item: IProduct) => {
  const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      if (cart.checkingProductInShoppingCart(item.id)) {
        cart.removeProduct(item);
      } else {
        cart.addProduct(item);
      }
      modal.close();
    },
  });

  const isInCart = cart.checkingProductInShoppingCart(item.id);

  const previewElement = cardPreview.render({
    title: item.title,
    category: item.category,
    image: `${CDN_URL}${item.image}`,
    price: item.price,
    description: item.description,
    buttonText: isInCart ? "Удалить из корзины" : "В корзину",
  });

  modal.content = previewElement;
  modal.open();
});
// Открытие корзины
events.on("basket:open", () => {
  const basket = new Basket(cloneTemplate(basketTemplate), {
    onClick: () => events.emit("order:open"),
  });
  const basketItems = cart
    .getProductsSelectedForPurchase()
    .map((item, index) => {
      const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), {
        onClick: () => {cart.removeProduct(item), events.emit(`basket:open`)}
      });

      return cardBasket.render({
        title: item.title,
        price: item.price,
        index: index + 1,
      });
    });
    const basketElements = basket.render({
      list: basketItems,
      price: cart.getTotalPrice(),
      button: basketItems.length > 0
    })
    modal.content =  basketElements
    modal.open()
});

// Обновление корзины

events.on('card:changed', (data: {items: IProduct[], total: number, count: number}) => {
  //console.log( `Счетчик корзины`, data.count); // отладка
  header.counter = data.count;
});

let currentFormOrder: FormOrder | null = null;

// Оформление заказа
events.on(`order:open`, () => {
  currentFormOrder = new FormOrder(cloneTemplate(orderTemplate), events); 
  const formElement = currentFormOrder.render({
    payment: buyer.getDataBuyer().payment,
    address: buyer.getDataBuyer().address
  });
  modal.content = formElement;
  modal.open();
})

// Изменения в форме заказа
events.on('form:changed', (data: { payment?: string; address?: string }) => {
    // Сохраняем данные
    if (data.payment) {
        buyer.saveData({ payment: data.payment });
    }
    if (data.address) {
        buyer.saveData({ address: data.address });
    }
    
    const allErrors = buyer.validate();

    // Валидация
    const orderErrors: string[] = [];
     if (allErrors.payment) {orderErrors.push(allErrors.payment)};
    if (allErrors.address) {orderErrors.push(allErrors.address)};
    
    // обновляем форму
   if (currentFormOrder) {
        currentFormOrder.error = orderErrors; 
        currentFormOrder.valid = orderErrors.length === 0;
    }
});

//Переъод к форме контактов
events.on(`contacts:open`, () => {
  const contactForm = new ContactForm(cloneTemplate(contactsTemplate), events)
  const contactElement = contactForm.render({
            email: buyer.getDataBuyer().email ,
            phone: buyer.getDataBuyer().phone
        });
        modal.content = contactElement
})
events.on(`contacts:changed`, (data :{email: string, phone: string}) => {
  if(data.email){
    buyer.saveData({email: data.email})
  }
  if (data.phone){
    buyer.saveData({phone: data.phone})
  }
  // Фильтр ошибок контактов
  const allErrors = buyer.validate()
  const contactErrors: string[] = []
  if(allErrors.email){
    contactErrors.push(allErrors.email)
  }
  if(allErrors.phone){
    contactErrors.push(allErrors.phone)
  }
  // Обновляем текущую форму контактов
    const currentForm = document.querySelector('.form[name="contacts"]');
    if (currentForm) {
        const contactForm = new ContactForm(currentForm as HTMLElement, events);
        contactForm.error = contactErrors;
        contactForm.valid = contactErrors.length === 0;
    }
})
//Отправка заказа
events.on(`order:submit`, async () =>{
  const orderTotal = cart.getTotalPrice();
    try {
        // Создаем заказ
        const order: IOrder = {
            ...buyer.getDataBuyer(),
            total: cart.getTotalPrice(),
            items: cart.getProductsSelectedForPurchase().map(item => item.id)
        };

        // Отправляем на сервер
        await api.createOrder(order);
        const success = new Success(cloneTemplate(successTemplate), events);
    const successElement = success.render({ 
      price: orderTotal
    });
    modal.content = successElement;

    cart.clearShoppingCart();
    buyer.clearDataBuyer();
        
    } catch (error) {
        console.error('Ошибка при оформлении заказа:', error);
    }
})
