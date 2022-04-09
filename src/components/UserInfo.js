export default class UserInfo {
  constructor({selectorName, selectorAbout, selectorAvatar}) {
    this._userName = document.querySelector(selectorName);
    this._userAbout = document.querySelector(selectorAbout);
    this._userAvatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    this._data = {
      userName: this._userName.textContent,
      userJob: this._userAbout.textContent
    };
    return this._data;
  }

  setUserInfo(data) {
    this._userName.textContent = data.userName;
    this._userAbout.textContent = data.userJob;
  }

  setAvatar(data) {
    this._userAvatar.src = data.avatar
  }
}
