import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(container, handleTrashClick) {
        super(Popup);
        this._container = container;
        this._handleTrashClick = handleTrashClick;
        this._formElement = this._container.querySelector('#trash-popup');
        this._element = this._container.querySelector('.gallery__card-trash-button');
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
        this._element.addEventListener('click', (evt) => {
            evt.target.classList.remove('like__active');
        });
    }
}
