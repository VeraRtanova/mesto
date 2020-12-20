const editProfilePopup = document.querySelector('#profile-popup');
const addCardPopup = document.querySelector('#card-popup');
const photoPopup = document.querySelector('#photo-popup');

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

const gallery = document.querySelector('.gallery');
const popupImage = document.querySelector('.popup__gallery-photo');
const popupCardSubtitle = document.querySelector('.popup__gallery-subtitle');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');


function escapeListener(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escapeListener);
}

function fillProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeListener);
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
    const name = cardNameInput.value;
    const link = cardLinkInput.value;
    addCard(name, link);
    closePopup(addCardPopup);
});

function createCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.gallery__card-image');
    cardImage.src = link;
    cardImage.alt = name;
    cardImage.addEventListener('click', function (evt) {
        popupImage.alt = name;
        popupImage.src = link;
        popupCardSubtitle.textContent = name;
        openPopup(photoPopup);
    });

    cardElement.querySelector('.gallery__card-name').textContent = name;
    cardElement.querySelector('.gallery__card-like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('like__active');
    });
    const trashCard = cardElement.querySelector('.gallery__card-trash-button');
    trashCard.addEventListener('click', function (evt) {
        evt.target.parentElement.remove();
    });
    return cardElement;
}

function addCard(name, link) {
    const card = createCard(name, link);
    gallery.prepend(card);
}

initialCards.forEach(mesto => addCard(mesto.name, mesto.link));

fillProfilePopup();