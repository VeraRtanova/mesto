import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(containerSelector, handleFormSubmit) {
        super(containerSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._container.querySelector('.popup__container');
        this._inputList = this._container.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    fillForm(formData) {
        this._inputList.forEach(input => {
            input.value = formData[input.name];
        })
    }
}