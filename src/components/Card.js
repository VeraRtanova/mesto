export default class Card {
    constructor({data, cardSelector, handleCardClick, handleDeleteClick, isOwner, isLiked, handleLikeClick, likesCount}) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
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

        const cardImage = this._element.querySelector('.gallery__card-image')
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardImage.addEventListener('click', this._handleCardClick);

        this._handleLikeClickOld();
        this._handleTrashCardClick();
        this._updateDeleteVisibility();
        this.updateLikes(this._isLiked, this._likesCount);

        return this._element;
    }

    _handleLikeClickOld() {
        this._element.querySelector('.gallery__card-like-button').addEventListener('click', (evt) => {
            this._handleLikeClick(this._isLiked);
            // evt.target.classList.toggle('like__active');
        });
    }

    _handleTrashCardClick() {
        this._element.querySelector('.gallery__card-trash-button').addEventListener('click', this._handleDeleteClick)
    }

    remove() {
        this._element.closest('.gallery__card').remove();
    }

    _updateDeleteVisibility() {
        if(!this._isOwner) {
            this._element.querySelector('.gallery__card-trash-button').remove();
        }
    }

    updateLikes(isLiked, likesCount) {
        this._isLiked = isLiked
        this._likesCount = likesCount

        if (this._isLiked) {
            this._element.querySelector('.gallery__card-like-button').classList.add('like__active');
        } else {
            this._element.querySelector('.gallery__card-like-button').classList.remove('like__active');
        }

        this._element.querySelector('.gallery__card-like-text').textContent = this._likesCount;
    }
}