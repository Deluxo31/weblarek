import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { categoryMap } from "../../../utils/constants";

type categoryKey = keyof typeof categoryMap

interface ICardActions {
    onClick: () => void
}
interface ICardCatalog {
    id: string;
    category: string;
    title: string;
    image: string;
    price: number | null;
}

export class CardCatalog  extends Card<ICardCatalog>{
    imageElement: HTMLImageElement;
    categoryElement: HTMLElement;

    constructor (container: HTMLElement, actions?: ICardActions){
        super(container)
        this.imageElement = ensureElement<HTMLImageElement>(`.card__image`, this.container)
        this.categoryElement = ensureElement<HTMLElement>(`.card__category`, this.container)

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick)
        }
        
    }
        set image(value: string) {
            this.setImage(this.imageElement, value, this.title)
           }

        set category(value: string) {
            this.categoryElement.textContent = value
            Object.values(categoryMap).forEach(className => {
            this.categoryElement.classList.remove(className);
        });
        
        // Добавляем нужный класс
        const categoryClass = categoryMap[value as categoryKey];
              if (categoryClass) {
                this.categoryElement.classList.add(categoryClass);
        }
    }
        
}  