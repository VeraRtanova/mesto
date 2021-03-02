export default class Card {
    constructor({data, cardSelector, handleCardClick, handleDeleteClick, isOwner, isLiked, handleLikeClick, likesCount}) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._isOwner = isOwner;
        this._isLiked = isLiked;
        this._handleLikeClick = handleLikeClick;
        this._likesCount = likesCount;
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
        this._likeButtonElement = this._element.querySelector('.gallery__card-like-button');
        this._likeCountElement = this._element.querySelector('.gallery__card-like-text');
        this._deleteButtonElement = this._element.querySelector('.gallery__card-trash-button');

        const cardImage = this._element.querySelector('.gallery__card-image')
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardImage.addEventListener('click', this._handleCardClick);

        this._likeButtonElement.addEventListener('click', (evt) => {
            this._handleLikeClick(this._isLiked);
        });

        if (!this._isOwner) {
            this._deleteButtonElement.remove();
        } else {
            this._deleteButtonElement.addEventListener('click', this._handleDeleteClick)
        }

        this.updateLikes(this._isLiked, this._likesCount);

        return this._element;
    }

    remove() {
        this._element.closest('.gallery__card').remove();
    }

    updateLikes(isLiked, likesCount) {
        this._isLiked = isLiked
        this._likesCount = likesCount

        if (this._isLiked) {
            this._likeButtonElement.classList.add('like__active');
        } else {
            this._likeButtonElement.classList.remove('like__active');
        }

        this._likeCountElement.textContent = this._likesCount;
    }
}