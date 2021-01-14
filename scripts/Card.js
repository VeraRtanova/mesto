import {photoPopup, popupCardSubtitle, popupImage} from "./index.js";
import {openPopup} from "./index.js";

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.gallery__card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.gallery__card-image').src = this._link;
        this._element.querySelector('.gallery__card-image').alt = this._name;
        this._element.querySelector('.gallery__card-name').textContent = this._name;

        this._handleLikeClick();
        this._handleTrashCardClick();
        this._handleCardClick();

        return this._element;
    }

    _handleLikeClick() {
        this._element.querySelector('.gallery__card-like-button').addEventListener('click', (evt) => {
            evt.target.classList.toggle('like__active');
        });
    }

    _handleTrashCardClick() {
        this._element.querySelector('.gallery__card-trash-button').addEventListener('click', (evt) => {
            evt.target.parentElement.remove();
        });
    }

    _handleCardClick() {
        this._element.querySelector('.gallery__card-image').addEventListener('click', evt => {
            popupImage.alt = this._name;
            popupImage.src = this._link;
            popupCardSubtitle.textContent = this._name;
            openPopup(photoPopup);
        });
    }
}