import { IApi, IProduct, IOrder} from "../../types"
import { API_URL } from "../../utils/constants"
import { Api } from "../base/Api"

export class apiWeblarek {

   api: IApi 

constructor (){
    this.api = new Api(API_URL)
}

async getProductList(){
    try{
    const response = await this.api.get<{ total: number, items: IProduct[]}>('/product/')
    return response
    } catch (error) {
        console.error('Ошибка:', error);
    throw error;
    }
} 

async createOrder(order: IOrder) {
    await this.api.post('/order/', order)
}

}