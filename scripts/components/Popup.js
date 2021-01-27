export default class Popup {
    constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
    }

    open() {
        this._container.classList.add('popup_opened');
        this._handleEscClose();
    }

    close() {
        this._container.classList.remove('popup_opened');
    }

    _handleEscClose() {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        })
    }

    setEventListeners(popupCloseIcon) {
        this._container
            .querySelector(popupCloseIcon)
            .addEventListener('click', () => {
            this.close();
        });
    }
}


