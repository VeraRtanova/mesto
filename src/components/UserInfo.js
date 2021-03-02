export default class UserInfo {
    constructor(userNameSelector, userInfoSelector, avatarSelector) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userInfoElement = document.querySelector(userInfoSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    setUserInfo(name, info) {
        this._userNameElement.textContent = name;
        this._userInfoElement.textContent = info;
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            info: this._userInfoElement.textContent,
        };
    }

    setAvatar(link) {
        this._avatarElement.src = link;
    }

    setUserId(id) {
        this._id = id;
    }

    getUserId() {
        return this._id;
    }
}