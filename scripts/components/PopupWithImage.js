import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(data, containerSelector) {
        super(containerSelector);
        this._name = data.name;
        this._link = data.link;
    }

    open() {
        super.open();

        this._container.querySelector('.popup__gallery-photo').src = this._link;
        this._container.querySelector('.popup__gallery-photo').alt = this._name;
        this._container.querySelector('.popup__gallery-subtitle').textContent = this._name;

    }
}

