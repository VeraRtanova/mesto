import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
        this._cardImage = this._container.querySelector('.popup__gallery-photo');
        this._cardSubtitle = this._container.querySelector('.popup__gallery-subtitle');
    }

    open(name, link) {
        super.open();

        this._cardImage.src = link;
        this._cardImage.alt = name;
        this._cardSubtitle.textContent = name;
    }
}