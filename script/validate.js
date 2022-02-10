const showInputError = (formElement, inputElement, errorMessage, pull) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(pull.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(pull.errorClass);
};

const hideInputError = (formElement, inputElement, pull) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(pull.inputErrorClass);
  errorElement.classList.remove(pull.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, pull);
  } else {
    hideInputError(formElement, inputElement, pull);
  }
};

const setEventListeners = (formElement, pull) => {
  const inputList = Array.from(formElement.querySelectorAll(pull.inputSelector));
  const buttonElement = formElement.querySelector(pull.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, pull);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, pull);
    });
  });
}

function enableValidation(pull) {
  let formList = Array.from(document.querySelectorAll(pull.formSelector));
  formList.forEach((formElement)=> {
    formElement.addEventListener('submit', (evt)=> {
      evt.preventDefault;
    });
    setEventListeners(formElement, pull);
    
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, pull) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(pull.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(pull.inactiveButtonClass);
  }
}

enableValidation( pull={
  formSelector: '.popup__body',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});

