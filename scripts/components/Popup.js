export default class Popup {
    constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
    }

    open() {
        this._container.classList.add('popup_opened');
        this._handleEscClose();
        this.setEventListeners();
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

    setEventListeners() {
        this._container.addEventListener('click', () => {
            this.close();
        });
    }
}


