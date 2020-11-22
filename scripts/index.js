let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');

let addButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__icon');
let saveButton = document.querySelector('.popup__button');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let inputTitle = document.querySelector('.popup__input_type_title');
let inputSubtitle = document.querySelector('.popup__input_type_subtitle');


function openPopup() {
    popup.classList.add('popup_opened');
    inputTitle.value = profileTitle.textContent;
    inputSubtitle.value = profileSubtitle.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function save(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputSubtitle.value;
    closePopup();
}

addButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', save);
