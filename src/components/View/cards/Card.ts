import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface ICard {
    title: string;
    price: number | null;
    image: string
    category: string
}

export abstract class Card<T> extends Component<ICard & T>{
    titleElement: HTMLElement;
    priceElement: HTMLElement;

    constructor (container: HTMLElement) {
        super(container)
        this.titleElement = ensureElement<HTMLElement>('.card__title', container)
        this.priceElement = ensureElement<HTMLElement>('.card__price', container)
    }
    
    set title(name: string) {
        this.titleElement.textContent = name
    }

    set price(price: number | null) {
        if(price){
            this.priceElement.textContent = `${price} синапсов`
        } else {
            this.priceElement.textContent = `Бесценно`
        }
    }
}