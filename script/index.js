const ButtonChangeProfileInfo = document.querySelector('.profile__change');
const ClosePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__body');
let nameInput = formElement.querySelector('.nameInput');
let jobInput = formElement.querySelector('.jobInput');
const submit = formElement.querySelector('.popup__submit');

function openPopUpFieled() {
  let profileName = document.querySelector('.profile__userName').innerText;
  let profileJob = document.querySelector('.profile__job').innerText;

  nameInput.value = profileName;
  jobInput.value = profileJob;
}

function togglePopUp() {
  popup.classList.toggle('popup_active');
}

ButtonChangeProfileInfo.addEventListener('click', function() {
  togglePopUp();
  openPopUpFieled();
})

function formSubmitHandler (evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;

  let profileName = document.querySelector('.profile__userName');
  profileName.textContent = nameInput.value;
  let profileJob = document.querySelector('.profile__job');
  profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 
submit.addEventListener('click', togglePopUp);

ClosePopup.addEventListener ('click', togglePopUp);
