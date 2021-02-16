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
    validationSettings,
    cardTemplateSelector,
    popupContainerSelector,
    profileAvatar,
    avatarSelector,
    trashCardPopupSelector,
    trashButton
} from "../utils/constants.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: '7292ee4a-7ebb-40aa-bff9-e15391a63339',
        'Content-Type': 'application/json'
    }
})

//Галлерея
let cardList;

api.loadingCards()
    .then(cards => {
        cardList = new Section({
                data: cards,
                renderer: (item) => cardRenderer(item),
            }, gallerySelector,
        );
        cardList.renderItems();
    });

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

//Добавление новой карточки
addCardButton.addEventListener('click', () => {
    addCardPopup.open();
})
const addCardPopup = new PopupWithForm(addCardPopupSelector, (formData) => {
    api.addNewCard(formData.name, formData.link)
        .then(res => {
            cardRenderer(res);
        })
})
addCardPopup.setEventListeners();

//Открытие попап по иконке удаления


// Изменить Аватар
profileAvatar.addEventListener('click', () => {
    avatarPopup.open();
})
const avatarRenderer = (link) => {
    userInfo.setAvatar(link);
}
const avatarPopup = new PopupWithForm(avatarProfilePopupSelector, (formData) => {
    avatarRenderer(formData.link);
    api.updateUserAvatar(formData.link)
        .then(res => {
            userInfo.setAvatar(res.link);
        })
})
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

api.getUserInfo()
    .then(userData => {
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setAvatar(userData.avatar);
    })
