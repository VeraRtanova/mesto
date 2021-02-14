import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
    addCardPopupSelector,
    photoPopupSelector,
    editProfilePopupSelector,
    avatarProfilePopupSelector,
    profileTitle,
    profileSubtitle,
    editProfileButton,
    addCardButton,
    gallerySelector,
    initialCards,
    validationSettings,
    cardTemplateSelector,
    popupContainerSelector,
    profileAvatar,
    avatarSelector,
    trashCardPopupSelector,
    trashButton
} from "../utils/constants.js";

//Галлерея
const cardList = new Section({
        data: initialCards,
        renderer: (item) => cardRenderer(item),
    }, gallerySelector,
);

const cardRenderer = (item) => {
    const cardElement = createCard(item)
    cardList.addItem(cardElement);
}

const createCard = (item) => {
    const card = new Card(item, cardTemplateSelector, () => {
            popupWithImage.open(item.name, item.link);
        },
        // trashPopup.open()
    )
    const cardElement = card.generateCard();
    return cardElement
}

const popupWithImage = new PopupWithImage(photoPopupSelector);
popupWithImage.setEventListeners();

cardList.renderItems();

//Добавление новой карточки
addCardButton.addEventListener('click', () => {
    addCardPopup.open();
})
const addCardPopup = new PopupWithForm(addCardPopupSelector, (formData) => cardRenderer(formData));
addCardPopup.setEventListeners();

//Открытие попап по иконке удаления
// this._element.querySelector('.gallery__card-trash-button').addEventListener('click', (evt) => {
//             // evt.target.parentElement.remove();

//
// const trashPopup = new PopupWithForm(trashCardPopupSelector);
//     evt.target.parentElement.remove();
// })
// trashPopup.setEventListeners();
// trashPopup.open();
// }


// Добавить новый Аватар
profileAvatar.addEventListener('click', () => {
    avatarPopup.open();
})
const avatarRenderer = (link) => {
    profileAvatar.src = link;
}
const avatarPopup = new PopupWithForm(avatarProfilePopupSelector, (formData) => avatarRenderer(formData.link));
avatarPopup.setEventListeners();

//Редактирование профиля Жак ив Кусто
editProfileButton.addEventListener('click', () => {
    profilePopup.open();
    profilePopup.fillForm(userInfo.getUserInfo());
})
const profilePopup = new PopupWithForm(editProfilePopupSelector, (formData) => {
    api.updateUserInfo(formData.name, formData.info)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
        })
})
profilePopup.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileSubtitle, avatarSelector);

document.querySelectorAll(popupContainerSelector).forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.enableValidation();
});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: '7292ee4a-7ebb-40aa-bff9-e15391a63339',
        'Content-Type': 'application/json'
    }
})

api.getUserInfo()
    .then(userData => {
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setAvatar(userData.avatar);
    })
