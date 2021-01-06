import {gallery, photoPopup, popupCardSubtitle, popupImage} from "./index.js";
import {openPopup} from "./index.js";

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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
        this._element.querySelector('.gallery__card-name').textContent = this._name;

        this._setEventListeners();
        this._handleTrashCardClick();
        this._handleCardClick();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.gallery__card-like-button').addEventListener('click', () => {
            this._handleLikeClick();
        });
    }

    _handleLikeClick() {
        this._element.querySelector('.gallery__card-like-button').classList.toggle('like__active')
    }

    _handleTrashCardClick() {
        this._element.querySelector('.gallery__card-trash-button').addEventListener('click', (evt) => {
            evt.target.parentElement.remove();
        });
    }

    _handleCardClick() {
        this._element.addEventListener('click', evt => {
            popupImage.alt = this._name;
            popupImage.src = this._link;
            popupCardSubtitle.textContent = name;
            openPopup(photoPopup);
        });
    }
}

initialCards.forEach((item) => {
    const card = new Card(item, '#card-template');
    const cardElement = card.generateCard();
    gallery.prepend(cardElement);
});

