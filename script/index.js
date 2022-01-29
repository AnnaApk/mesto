const buttonChangeProfileInfo = document.querySelector('.profile__change');
const closeProfilePopup = document.querySelector('.popup__close_profile');
const popupProfile = document.querySelector('.popup_profile');

const formElement = document.querySelector('.popup__body');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
const submit = formElement.querySelector('.popup__submit');

let profileName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__job');

function openPopUpFieled() {
  nameInput.value = profileName.innerText;
  jobInput.value = profileJob.innerText;
};

function togglePopUp(el) {
  el.classList.toggle('popup_active');
};

buttonChangeProfileInfo.addEventListener('click', function() {
  togglePopUp(popupProfile);
  openPopUpFieled();
});

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopUp(popupProfile);
};

formElement.addEventListener('submit', formSubmitHandler);

closeProfilePopup.addEventListener ('click', () => togglePopUp(popupProfile));

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementTemplate = document.querySelector('.element__template').content;
const elements = document.querySelector('.elements');

initialCards.forEach((el)=> {
  const newElement = elementTemplate.cloneNode(true);

  newElement.querySelector('.element__title').textContent = el.name;
  newElement.querySelector('.element__photo').src = el.link;
  addListeners(newElement);
  elements.prepend(newElement);
});

const popupNewPost = document.querySelector('.popup_new-post');
const buttonAddNewPost = document.querySelector('.profile__add-post');
const closeAddPostPopup = document.querySelector('.popup__close_add-post');
const placeInput = popupNewPost.querySelector('.popup__input_type_place');
const photoInput = popupNewPost.querySelector('.popup__input_type_photo');
const submitAddingPost = popupNewPost.querySelector('.popup__body');

function formSubmitAddingPost (evt) {
  evt.preventDefault();

  const newElement = elementTemplate.cloneNode(true);

  newElement.querySelector('.element__title').textContent = placeInput.value;
  newElement.querySelector('.element__photo').src = photoInput.value;
  addListeners(newElement);
  elements.prepend(newElement);
  togglePopUp(popupNewPost);
  placeInput.value = '';
  photoInput.value = '';
};

buttonAddNewPost.addEventListener('click', ()=> togglePopUp(popupNewPost));
closeAddPostPopup.addEventListener('click', ()=> togglePopUp(popupNewPost));
submitAddingPost.addEventListener('submit', formSubmitAddingPost);

function deletePost(evt) {
  evt.target.closest('.element').remove();
};

function toggleLike(el) {
  el.target.classList.toggle('element__like_active');
};

const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePopupPhoto = document.querySelector('.popup__close_photo');

function fieldPopupPhoto(evt) {
  document.querySelector('.popup__photo').src = evt.target.src;
  document.querySelector('.popup__photo-title').textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
  togglePopUp(popupPhoto);
};

buttonClosePopupPhoto.addEventListener('click', ()=> togglePopUp(popupPhoto));

function addListeners(el) {
  el.querySelector('.element__photo').addEventListener('click', fieldPopupPhoto);
  el.querySelector('.element__like').addEventListener('click', toggleLike);
  el.querySelector('.element__delete').addEventListener('click', deletePost);
};
