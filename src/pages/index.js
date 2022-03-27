import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const buttonChangeProfileInfo = document.querySelector('.profile__change');
const popupProfile = document.querySelector('.popup_profile');
const profileForm = document.querySelector('.popup__body');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const array = document.querySelector('.elements');
const elements = '.elements';
const popupNewPost = document.querySelector('.popup_new-post');
const buttonAddNewPost = document.querySelector('.profile__add-post');

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

const validationList = {
  formSelector: '.popup__body',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.element__template', (title, link) => {
        const popupCard = new PopupWithImage(title, link, '.popup_photo');
        
        popupCard._setEventListeners();
        popupCard.open();
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elements);

cardList.renderItems();

const popupWithNewPost = new PopupWithForm('.popup_new-post', (item) => {

  const cardNew = new Card(item.NewPlace, item.NewPhoto, '.element__template', (title, link) => {
    const popupCard = new PopupWithImage(title, link, '.popup_photo');
    popupCard._setEventListeners();
    popupCard.open();
  });
  const cardElementNew = cardNew.generateCard();
  array.prepend(cardElementNew);
});

popupWithNewPost.setEventListeners();

buttonAddNewPost.addEventListener('click', ()=> {popupWithNewPost.open()});

const user = new UserInfo({
  selectorName: '.profile__user-name',
  selectorAbout: '.profile__job'
});

const popupUserProfile = new PopupWithForm('.popup_profile', (data) => {user.setUserInfo(data)});

popupUserProfile.setEventListeners();

buttonChangeProfileInfo.addEventListener('click', () => {
  popupUserProfile.open();
  const userData = user.getUserInfo();
  nameInput.value = userData.UserName;
  jobInput.value = userData.UserJob;
})

const editProfileValidator = new FormValidator(validationList, popupProfile);
const editCardValidator = new FormValidator(validationList, popupNewPost);

editProfileValidator.enableValidation();
editCardValidator.enableValidation();
