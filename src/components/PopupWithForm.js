import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupInputs = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__body');
    this._submitButton = this._popup.querySelector('.popup__submit')
  }

  _getInputValues() {
    this._inputList = this._popupInputs;
  
    this._formValues = {};
  
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    return this._formValues;
  }

  changeHandleSubmit(newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._submitButton);
    });
  }

  close = () => {
    super.close();
    this._popupForm.reset();
  }
}
