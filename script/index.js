const buttonChangeProfileInfo = document.querySelector('.profile__change');
const closePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__body');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
const submit = formElement.querySelector('.popup__submit');

let profileName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__job');

function openPopUpFieled() {
  nameInput.value = profileName.innerText;
  jobInput.value = profileJob.innerText;
}

function togglePopUp() {
  popup.classList.toggle('popup_active');
}

buttonChangeProfileInfo.addEventListener('click', function() {
  togglePopUp();
  openPopUpFieled();
})

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopUp();
}

formElement.addEventListener('submit', formSubmitHandler);

closePopup.addEventListener ('click', togglePopUp);
