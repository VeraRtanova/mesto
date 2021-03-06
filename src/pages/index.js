import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";
import {
    addCardButton,
    addCardPopupSelector,
    avatarProfilePopupSelector,
    avatarSelector,
    cardTemplateSelector,
    editProfileButton,
    editProfilePopupSelector,
    gallerySelector,
    photoPopupSelector,
    popupConfirmSelector,
    popupContainerSelector,
    profileAvatar,
    profileSubtitle,
    profileTitle,
    validationSettings,
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
    const card = new Card({
        data: item,
        cardSelector: cardTemplateSelector,
        handleCardClick: () => popupWithImage.open(item.name, item.link),
        handleDeleteClick: () => popupConfirm.open({
            handleConfirm: () => {
                popupConfirm.setLoading("Удаление...")
                api.deleteCard(item._id)
                    .then(res => card.remove())
                    .finally(() => popupConfirm.close())
            }
        }),
        isOwner: item.owner._id === userInfo.getUserId(),
        isLiked: item.likes.some((like) => like._id === userInfo.getUserId()),
        handleLikeClick: (isLiked) => {
            api.likeCard(item._id, isLiked)
                .then(res => card.updateLikes(res.likes.some(isCardLiked), res.likes.length));
        },
        likesCount: item.likes.length
    })

    return card.generateCard()
}

const isCardLiked = like => like._id === userInfo.getUserId();

const popupWithImage = new PopupWithImage(photoPopupSelector);
popupWithImage.setEventListeners();

const popupConfirm = new PopupConfirm(popupConfirmSelector);
popupConfirm.setEventListeners();

//Добавление новой карточки
addCardButton.addEventListener('click', () => addCardPopup.open());

const addCardPopup = new PopupWithForm(addCardPopupSelector, (formData) => {
    addCardPopup.setLoading("Сохранение...");
    api.addNewCard(formData.name, formData.link)
        .then(res => cardRenderer(res))
        .finally(() => addCardPopup.close());
})
addCardPopup.setEventListeners();

// Изменить Аватар
profileAvatar.addEventListener('click', () => avatarPopup.open());
const avatarRenderer = (link) => userInfo.setAvatar(link);

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
    profilePopup.setLoading("Сохранение...")
    api.updateUserInfo(formData.name, formData.info)
        .then(res => userInfo.setUserInfo(res.name, res.about))
        .finally(() => profilePopup.close())
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
        userInfo.setUserId(userData._id);
    })
