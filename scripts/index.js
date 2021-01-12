const editProfilePopup = document.querySelector('#profile-popup');
const addCardPopup = document.querySelector('#card-popup');
export const photoPopup = document.querySelector('#photo-popup');

const profileClose = document.querySelector('#profile-close');
const cardClose = document.querySelector('#card-close');
const photoClose = document.querySelector('#photo-close');

const profileForm = document.querySelector('#profile-form');
const cardForm = document.querySelector('#card-form');

const cardNameInput = document.querySelector('#card-name-input');
const cardLinkInput = document.querySelector('#card-link-input');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__input_type_title');
const jobInput = document.querySelector('.popup__input_type_subtitle');

export const popupImage = document.querySelector('.popup__gallery-photo');
export const popupCardSubtitle = document.querySelector('.popup__gallery-subtitle');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
export const gallery = document.querySelector('.gallery');

import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function fillProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

function saveProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(editProfilePopup);
}

addCardButton.addEventListener('click', function () {
    openPopup(addCardPopup);
});

editProfileButton.addEventListener('click', function () {
    openPopup(editProfilePopup);
});

const closePopupFone = () => {
    const popupFone = document.querySelectorAll('.popup');
    popupFone.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                closePopup(evt.target);
            }
        });
    });
};

closePopupFone();

profileClose.addEventListener('click', function () {
    closePopup(editProfilePopup);
})

cardClose.addEventListener('click', function () {
    closePopup(addCardPopup);
})

photoClose.addEventListener('click', function () {
    closePopup(photoPopup);
})

profileForm.addEventListener('submit', saveProfile);

cardForm.addEventListener('submit', function (ev) {
    ev.preventDefault();

    const data = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    }
    const card = new Card(data, '#card-template');
    const cardElement = card.generateCard();
    gallery.prepend(cardElement);

    closePopup(addCardPopup);
});

fillProfilePopup();

const validationSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

document.querySelectorAll('.popup__container').forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.enableValidation();
});



