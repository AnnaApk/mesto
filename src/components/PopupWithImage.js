import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(title, link, selectorPopup) {
    super(selectorPopup);
    this._link = link;
    this._title = title;
  }

  open() {
    super.open();
   
    this._popupImage = document.querySelector('.popup__image');
    this._popupTitle = document.querySelector('.popup__photo-title');

    this._popupImage.src = this._link;
    this._popupImage.alt = '${this._title}';
    this._popupTitle.textContent = this._title;
  }
}
