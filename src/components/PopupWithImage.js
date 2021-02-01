import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
    }

    open(name, link) {
        super.open();

        const cardImage = document.querySelector('.popup__gallery-photo');
        cardImage.src = link;
        cardImage.alt = name;
        this._container.querySelector('.popup__gallery-subtitle').textContent = name;
    }
}

