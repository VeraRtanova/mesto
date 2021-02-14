export default class Card {
    constructor(data, cardSelector, handleCardClick, handleTrashClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.gallery__card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.gallery__card-name').textContent = this._name;

        const cardImage = this._element.querySelector('.gallery__card-image')
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardImage.addEventListener('click', this._handleCardClick);

        this._handleLikeClick();
        this._handleTrashCardClick();

        return this._element;
    }

    _handleLikeClick() {
        this._element.querySelector('.gallery__card-like-button').addEventListener('click', (evt) => {
            evt.target.classList.toggle('like__active');
        });
    }

    _handleTrashCardClick() {
        const handleTrash = this._element.querySelector('.gallery__card-trash-button')
        handleTrash.addEventListener('click', this._handleTrashClick);
    }
}