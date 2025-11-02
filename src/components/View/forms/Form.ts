import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IFormActions  {
    onClick: () => void
}

export interface IForm {
  errorText?: string;
}

export abstract class  Form<T> extends Component<T & IForm> {
    protected buttonElement: HTMLButtonElement
    protected errors: HTMLElement;

    constructor (container: HTMLElement, actions?: IFormActions, protected events?: IEvents) {
        super(container)
        this.buttonElement = ensureElement<HTMLButtonElement>(`.button[type="submit"]`, container)
         this.errors = ensureElement<HTMLElement>(".form__errors", container);
         
         if (actions?.onClick) {
           this.buttonElement.addEventListener('click', (e) => {
                e.preventDefault();
                actions.onClick();
            });
        }
  
    }

    set error(value: string | string[]) {
        if (Array.isArray(value)) {
            this.errors.textContent = value.join(', ');
        } else {
            this.errors.textContent = value;
        }
    }


  set valid(isValid: boolean) {
    this.buttonElement.disabled = !isValid;
  }
}