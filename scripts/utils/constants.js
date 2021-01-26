export const initialCards = [
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

export const addCardPopupSelector = '#card-popup';
export const photoPopupSelector = '#photo-popup';
export const editProfilePopupSelector = '#profile-popup';

export const profileClose = document.querySelector('#profile-close');
export const cardClose = document.querySelector('#card-close');
export const photoClose = document.querySelector('#photo-close');
export const popupIcon = document.querySelectorAll('.popup__icon');

export const profileForm = document.querySelector('#profile-form');
export const cardForm = document.querySelector('#card-form');

export const cardNameInput = document.querySelector('#card-name-input');
export const cardLinkInput = document.querySelector('#card-link-input');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

export const nameInput = document.querySelector('.popup__input_type_title');
export const jobInput = document.querySelector('.popup__input_type_subtitle');

export const popupImage = document.querySelector('.popup__gallery-photo');
export const popupCardSubtitle = document.querySelector('.popup__gallery-subtitle');

export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const gallerySelector = '.gallery';
export const gallery = document.querySelector('.gallery');