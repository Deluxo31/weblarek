import { ensureElement } from "../../../utils/utils"
import { Card } from "./Card"
import { IProduct } from "../../../types"



interface ICardActions {
    onClick: () => void
}

interface ICardBasket {
    index: number
    
}

export class CardBasket extends Card<ICardBasket> {
    indexElement: HTMLElement
    buttonElement: HTMLButtonElement

    constructor (container: HTMLElement, actions?: ICardActions) {
        super(container)
        this.indexElement = ensureElement<HTMLElement>(`.basket__item-index`, container)
        this.buttonElement = ensureElement<HTMLButtonElement>(`.basket__item-delete`, container)

         if (actions?.onClick) {
            this.buttonElement.addEventListener('click', actions.onClick)
        }
    } 

    set index(value: number){
        this.indexElement.textContent = String(value)
    }
}