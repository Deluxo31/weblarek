import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
 
interface IModal {
    content: HTMLElement
}

export class Modal extends Component<IModal> {

    modalContent: HTMLElement
    closeButton : HTMLButtonElement

    constructor(protected events: IEvents, container: HTMLElement){
        super(container)
        this.modalContent =  ensureElement<HTMLElement>('.modal__content', this.container)
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container)

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });

        this.closeButton.addEventListener(`click`, () => {
            this.events.emit(`modal:close`)
        } )
    }
    
    set content(el: HTMLElement) {
        this.modalContent.innerHTML = '';
        this.modalContent.appendChild(el)
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }
 
}