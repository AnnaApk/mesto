export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup)
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (!evt.target.closest('.popup__overlay')) {
        this.close();
      };
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      };
  });
  }
}
