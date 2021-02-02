import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    addCardPopupSelector,
    photoPopupSelector,
    editProfilePopupSelector,
    profileTitle,
    profileSubtitle,
    editProfileButton,
    addCardButton,
    gallerySelector,
    initialCards,
    validationSettings,
    cardTemplateSelector,
    popupContainerSelector
} from "../utils/constants.js";

// //Галлерея
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
    });
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

//Редактирование профиля Жак ив Кусто
editProfileButton.addEventListener('click', () => {
    profilePopup.open();
    profilePopup.fillForm(userInfo.getUserInfo());
})
const profilePopup = new PopupWithForm(editProfilePopupSelector, (formData) => {
    userInfo.setUserInfo(formData.name, formData.info);
})
profilePopup.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileSubtitle);

document.querySelectorAll(popupContainerSelector).forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.enableValidation();
});