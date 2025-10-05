import { IBuyer } from "../../types";

export class Buyer {
   private data: IBuyer = {
    payment: "",
    address: "",
    email: "",
    phone:""
   }


   constructor(){

   }

   saveData(data: Partial<IBuyer>): void{
      this.data = {...this.data, ...data}
   }

   getDataBuyer() : IBuyer {
   return this.data
   }

   clearDataBuyer(): void {
    this.data = {
    payment: "",
    address: "",
    email: "",
    phone:""
   }
   }

   validate(): Partial<IBuyer> {
  const errors: Partial<IBuyer> = {};

  if (!this.data.payment) {
    errors.payment = 'Не выбран способ оплаты';
  }
  if (!this.data.email) {
    errors.email = 'Укажите email';
  }
  if (!this.data.phone) {
    errors.phone = 'Укажите телефон';
  }
  if (!this.data.address) {
    errors.address = 'Укажите адрес';
  }

  return errors;
}
   
}