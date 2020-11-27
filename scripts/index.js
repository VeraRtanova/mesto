let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');

let addButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__icon');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let nameInput = document.querySelector('.popup__input_type_title');
let jobInput = document.querySelector('.popup__input_type_subtitle');
let likeButtons = document.querySelectorAll('.gallery__card-like-button');


function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function save(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}

addButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', save);


for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', function () {
        likeButtons[i].classList.toggle('like__active')
        likeButtons[i].classList.toggle('gallery__card-like-button')
    });
}

