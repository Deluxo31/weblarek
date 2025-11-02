import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
    price: number
}

export class Success extends Component<ISuccess> {
    buttonElement: HTMLButtonElement
    priceElement: HTMLElement

    constructor(container: HTMLElement, events: IEvents) {
        super(container)

        this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', container)
        this.priceElement = ensureElement<HTMLElement>('.order-success__description', container)

        this.buttonElement.addEventListener('click', () => {
            events.emit('modal:close')
        })
    }

    set price(price: number) {
        this.priceElement.textContent = `Списано ${price} синапсов`
    }
}