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

const editProfilePopup = document.querySelector('#profile-popup');
const addCardPopup = document.querySelector('#card-popup');

const profileClose = document.querySelector('#profile-close');
const cardClose = document.querySelector('#card-close');

const profileForm = document.querySelector('#profile-form');
const cardForm = document.querySelector('#card-form');

const cardNameInput = document.querySelector('#card-name-input');
const cardLinkInput = document.querySelector('#card-link-input');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__input_type_title');
const jobInput = document.querySelector('.popup__input_type_subtitle');

const gallery = document.querySelector('.gallery');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function fillProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function save(evt) {
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
    fillProfilePopup();
});

profileClose.addEventListener('click', function () {
    closePopup(editProfilePopup);
})

cardClose.addEventListener('click', function () {
    closePopup(addCardPopup);
})

profileForm.addEventListener('submit', save);
cardForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const name = cardNameInput.value;
    const link = cardLinkInput.value;
    addCard(name, link);
    closePopup(addCardPopup);
});

function addCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.gallery__card-image').src = link;
    cardElement.querySelector('.gallery__card-name').textContent = name;
    cardElement.querySelector('.gallery__card-like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('like__active');
    });
    gallery.prepend(cardElement);
}

initialCards.forEach(mesto => addCard(mesto.name, mesto.link));