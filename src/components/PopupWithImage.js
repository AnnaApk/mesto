import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  open(title, link) {
    this._link = link;
    this._title = title;
    super.open();
   
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__photo-title');

    this._popupImage.src = this._link;
    this._popupImage.alt = '${this._title}';
    this._popupTitle.textContent = this._title;
  }
}
