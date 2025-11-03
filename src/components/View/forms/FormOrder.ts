import { Form , IForm} from "./Form";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
interface IFormOrder extends IForm{
    payment: 'card' | 'cash' | '' | string
    address: string;
}
interface IFormActions {
    onClick: () => void;
}

export class FormOrder extends Form<IFormOrder> {
    cardPaymentButton: HTMLButtonElement
    cashPaymentButton: HTMLButtonElement
    addressInputElement: HTMLInputElement

    constructor(container: HTMLElement, events: IEvents){
        super(container)

        this.cardPaymentButton = ensureElement<HTMLButtonElement>('.button[name="card"]', container)
        this.cashPaymentButton = ensureElement<HTMLButtonElement>('.button[name="cash"]', container)
        this.addressInputElement = ensureElement<HTMLInputElement>('.form__input[name="address"]', container)
        
        // Обработчики клика по кнопкам оплаты
        if (this.cardPaymentButton) {
            this.cardPaymentButton.addEventListener('click', () => {
                events.emit('form:changed', { payment: 'card' })
            })
        }
        
        if (this.cashPaymentButton) {
            this.cashPaymentButton.addEventListener('click', () => {
                events.emit('form:changed', { payment: 'cash'})
            })
        }
        
        this.addressInputElement.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement
            events.emit('form:changed', { address: target.value })
        })
        
        container.addEventListener('submit', (e) => {
            e.preventDefault()
            events.emit('contacts:open')
        })
    }

    // Общий метод для установки способа оплаты
    private setPaymentMethod(method: 'card' | 'cash'): void {
        this.resetPaymentButtons();
        
        if (method === 'card') {
            this.cardPaymentButton.classList.add('button_alt-active');
        } else if (method === 'cash') {
            this.cashPaymentButton.classList.add('button_alt-active');
        }
    }

    // Метод для сброса состояния кнопок
    private resetPaymentButtons(): void {
        this.cardPaymentButton.classList.remove('button_alt-active')
        this.cashPaymentButton.classList.remove('button_alt-active')
    }

    // Сеттер для способа оплаты
    set payment(value: string) {
  if (value === 'card' || value === 'cash') {
    this.setPaymentMethod(value);
  }
}

    // Сеттер для адреса
    set address(value: string) {
        this.addressInputElement.value = value;
    }
}