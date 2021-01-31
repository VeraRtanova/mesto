export default class Popup {
    constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClick = this._handleOverlayClick.bind(this);
    }

    open() {
        this._container.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClick);
    }

    close() {
        this._container.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClick);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._container
            .querySelector('.popup__icon')
            .addEventListener('click', () => this.close());
    }
}


