import './scss/styles.scss';
import { Buyer } from './components/Models/Buyer';
import { Catalog } from './components/Models/Catalog';
import { ShoppingCart } from './components/Models/ShoppingCart';
import { apiProducts } from './utils/data';
import { apiWeblarek } from './components/Models/ApiWeblarek';


//const catalog = new Catalog();
//const cart = new ShoppingCart();
//const buyer = new Buyer();

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

const api = new apiWeblarek();

async function loadProductsFromAPI() {
  try {
    const productsFromAPI = await api.getProductList();
    console.log('Товары с API:', productsFromAPI);
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
  }
}

loadProductsFromAPI();