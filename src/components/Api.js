export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
            .then(this._handleResult)
            .catch(this._handleError)
    }

    updateUserInfo(name, info) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: info,
            })
        })
            .then(this._handleResult)
            .catch(this._handleError)
    }

    updateUserAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
            .then(this._handleResult)
            .catch(this._handleError)
    }

    loadingCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._handleResult)
            .catch(this._handleError)
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        })
            .then(this._handleResult)
            .catch(this._handleError)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._handleResult)
            .catch(this._handleError)
    }

    likeCard(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: !isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(this._handleResult)
            .catch(this._handleError)
    }

    _handleResult(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    _handleError(err) {
        console.log(err);
    }

}


