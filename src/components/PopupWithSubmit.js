import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(container, handleTrashClick) {
        super(Popup);
        this._container = container;
        this._handleTrashClick = handleTrashClick;
        this._formElement = this._container.querySelector('#trash-popup');
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', () => {
            this._formElement.preventDefault();
            this._handleTrashClick();
            this.close();
        });
    }

    close() {
        super.close();
    }

    _handleTrashClick() {
        this._element.querySelector('.gallery__card-trash-button').addEventListener('click', (evt) => {
            evt.target._container.remove();
        });
    }
}
