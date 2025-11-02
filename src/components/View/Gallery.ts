import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IGallery {
    catalog: HTMLElement[]
}

export class Gallery extends Component<IGallery> {

    galleryElement: HTMLElement

    constructor (container: HTMLElement) {
        super(container)
        this.galleryElement = ensureElement<HTMLElement>(`.gallery`)
    }


    set catalog(items: HTMLElement[]) {
        this.galleryElement.innerHTML = ''; // Очищаем что бы не дублировании карточек при обновлении каталога
        items.forEach(item => this.galleryElement.appendChild(item))
    }


}
