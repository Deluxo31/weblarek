import { IProduct, IOrder} from "../../types"
import { API_URL } from "../../utils/constants"
import { Api } from "../base/Api"

export class ApiWeblarek extends Api {

constructor (){
   super(API_URL)
}

async getProductList(){
    try{
    const response = await this.get<{ total: number, items: IProduct[]}>('/product/')
    return response
    } catch (error) {
        console.error('Ошибка:', error);
    throw error;
    }
} 

async createOrder(order: IOrder) {
    await this.post('/order/', order)
}

}