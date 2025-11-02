import { IBuyer } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
   private data: IBuyer = {
    payment: "",
    address: "",
    email: "",
    phone:""
   }
   private event: IEvents;


   constructor(event: IEvents) {
        this.event = event;
    }

   saveData(data: Partial<IBuyer>): void{
      this.data = {...this.data, ...data}
      this.event.emit('buyer:changed', { data: this.data });
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
   this.event.emit('buyer:changed', { data: this.data });
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