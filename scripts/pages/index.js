import Card from "../components/Card.js";

import {FormValidator} from "../components/FormValidator.js";

import Section from '../components/Section.js';

import {
    editProfilePopup,
    addCardPopup,
    profileClose,
    photoPopup,
    cardClose,
    photoClose,
    profileForm,
    cardForm,
    cardNameInput,
    cardLinkInput,
    profileTitle,
    profileSubtitle,
    nameInput,
    jobInput,
    editProfileButton,
    addCardButton,
    gallerySelector,
    gallery,
    initialCards
} from "../utils/constants.js";


const cardList = new Section({
        data: initialCards, renderer: (item) => {
            const card = new Card(item, '#card-template');
            const cardElement = card.generateCard();

            cardList.addItem(cardElement);
        }
    },
    gallerySelector
);

cardList.renderItems();


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
    const allPopups = document.querySelectorAll('.popup');
    allPopups.forEach((popup) => {
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