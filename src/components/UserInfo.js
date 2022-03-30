export default class UserInfo {
  constructor({selectorName, selectorAbout}) {
    this._userName = document.querySelector(selectorName);
    this._userAbout = document.querySelector(selectorAbout);
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
}
