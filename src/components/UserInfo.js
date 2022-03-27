export default class UserInfo {
  constructor({selectorName, selectorAbout}) {
    this._userName = document.querySelector(selectorName);
    this._userAbout = document.querySelector(selectorAbout);
  }

  getUserInfo() {
    this._data = {
      UserName: this._userName.textContent,
      UserJob: this._userAbout.textContent
    };
    return this._data;
  }

  setUserInfo(data) {
    this._userName.textContent = data.UserName;
    this._userAbout.textContent = data.UserJob;
  }
}
