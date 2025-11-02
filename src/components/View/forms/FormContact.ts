import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form , IForm} from "./Form";

interface IContactsForm extends IForm {
    phone: string
    email: string
}

interface IFormActions {
    onClick: () => void;
}

export class ContactForm extends Form<IContactsForm> {
    emailInputElement: HTMLInputElement
    phoneInputElement: HTMLInputElement

    constructor(container: HTMLElement, events: IEvents ){
        super(container)
        this.emailInputElement = ensureElement<HTMLInputElement>('.form__input[name="email"]', container)
        this.phoneInputElement = ensureElement<HTMLInputElement>('.form__input[name="phone"]', container)

        this.emailInputElement.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            events.emit('contacts:changed', { email: target.value });
        });

        this.phoneInputElement.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            events.emit('contacts:changed', { phone: target.value });
        });

        // Обработчик отправки формы
        this.buttonElement.addEventListener('click', (e) => {
            e.preventDefault();
            events.emit('order:submit');
        });
    }

    set email(value: string) {
        this.emailInputElement.value = value;
    }

    set phone(value: string) {
        this.phoneInputElement.value = value;
    }
}