export default class UserInfo {
    constructor(userNameSelector, userInfoSelector) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userInfoElement = document.querySelector(userInfoSelector);
    }

    setUserInfo(name, info) {
        this._userNameElement.textContent = name;
        this._userInfoElement.textContent = info;
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            info: this._userInfoElement.textContent
        };
    }
}