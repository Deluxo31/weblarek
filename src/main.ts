import './scss/styles.scss';
import { Buyer } from './components/Models/Buyer';
import { Catalog } from './components/Models/Catalog';
import { ShoppingCart } from './components/Models/ShoppingCart';
import { apiProducts } from './utils/data';
import { ApiWeblarek } from './components/Models/ApiWeblarek';


const catalog = new Catalog();
const cart = new ShoppingCart();
const buyer = new Buyer();

//catalog.setProducts(apiProducts.items);
//console.log('Каталог товаров:', catalog.getProducts());
//console.log('Товар по ID:', catalog.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390'));

//cart.addProduct(apiProducts.items[0])
//console.log('Товары в корзине:', cart.getProductsSelectedForPurchase());
//console.log('Общая стоимость:', cart.getTotalPrice());
//console.log('Количество товаров:', cart.getTotalCountProductsInShoppingCart());
// console.log('Проверка товара в корзине:', cart.checkingProductInShoppingCart('854cef69-976d-4c2a-a18c-2aa45046c390'));
// console.log('Удпление всех товаров из козины:', cart.clearShoppingCart());
//console.log (cart.getProductsSelectedForPurchase())

//buyer.saveData({ email: 'test@mail.com', phone: '1234567890' });
//console.log('Данные покупателя:', buyer.getDataBuyer());
//console.log('Валидация:', buyer.validate());

const api = new ApiWeblarek();

async function loadProductsFromAPI() {
  try {
    const productsFromAPI = await api.getProductList();
    console.log('Товары с API:', productsFromAPI);
    console.log ('Сохраняем массив с товарами', catalog.setProducts(productsFromAPI.items))
    console.log('Сохраненный массив с товарами', catalog.getProducts())
    console.log ( 'Получение одного товара по его id',catalog.getProductById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'))
    console.log('Сохранение товара для подробного отображения', catalog.setSelectedProduct(catalog.products[0]))
    console.log('Получение товара для подробного отображения', catalog.getSelectedProduct())

    cart.addProduct(catalog.products[3]);
      console.log('Товары в корзине:', cart.getProductsSelectedForPurchase());
      console.log('Общая стоимость:', cart.getTotalPrice());
      console.log('Количество товаров:', cart.getTotalCountProductsInShoppingCart());
      console.log('Проверка товара в корзине:', cart.checkingProductInShoppingCart("b06cde61-912f-4663-9751-09956c0eed67"));

    buyer.saveData({ email: 'test@mail.com', phone: '1234567890' });
    console.log('Данные покупателя:', buyer.getDataBuyer());
    console.log('Валидация:', buyer.validate());
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
  }
}

loadProductsFromAPI();