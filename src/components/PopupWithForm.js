import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
  
    this._formValues = {};
  
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    return this._formValues;
  } 

  setEventListeners() {
    super._setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close = () => {
    super.close();
    this._popup.querySelector('.popup__body').reset();
  }
}
