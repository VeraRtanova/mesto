import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(containerSelector, handleFormSubmit) {
        super(containerSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._container.querySelector('.popup__container');
        this._inputList = this._container.querySelectorAll('.popup__input');
        this._submitButtonElement = this._container.querySelector('.popup__button');
        this._initialSubmitButtonText = this._submitButtonElement.textContent;
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
        });
    }

    close() {
        super.close();
        this._formElement.reset();
        this._submitButtonElement.textContent = this._initialSubmitButtonText;
    }

    fillForm(formData) {
        this._inputList.forEach(input => {
            input.value = formData[input.name];
        })
    }

    setLoading(buttonText) {
        this._submitButtonElement.textContent = buttonText;
    }
}