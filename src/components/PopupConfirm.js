import PopupWithForm from "./PopupWithForm.js";

export default class PopupConfirm extends PopupWithForm {
    constructor(container) {
        super(container);
    }

    open({handleConfirm}) {
        super.open();
        this._handleFormSubmit = handleConfirm;
    }

}
