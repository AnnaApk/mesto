import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  buttonChangeProfileInfo,
  popupProfile,
  nameInput,
  jobInput,
  elements,
  popupNewPost,
  buttonAddNewPost,
  initialCards,
  validationList} from '../utils/constants';

const popupCard = new PopupWithImage('.popup_photo');  
popupCard.setEventListeners();

function creatCard({title, link}) {
  const card = new Card(title, link, '.element__template', (title, link) => {
    popupCard.open(title, link);
  });
  const cardElement = card.generateCard();
  return cardElement
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardList.addItem(creatCard({title:item.name, link:item.link}));
  }
}, elements);

const popupWithNewPost = new PopupWithForm('.popup_new-post', (item) => {
  const cardElementNew = creatCard({title: item.NewPlace, link: item.NewPhoto});
  cardList.addItem(cardElementNew);
});

cardList.renderItems();

popupWithNewPost.setEventListeners();

const user = new UserInfo({
  selectorName: '.profile__user-name',
  selectorAbout: '.profile__job'
});

const popupUserProfile = new PopupWithForm('.popup_profile', (data) => {user.setUserInfo(data)});

popupUserProfile.setEventListeners();

buttonChangeProfileInfo.addEventListener('click', () => {
  popupUserProfile.open();
  const userData = user.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userJob;
})

const editProfileValidator = new FormValidator(validationList, popupProfile);
const editCardValidator = new FormValidator(validationList, popupNewPost);

editProfileValidator.enableValidation();
editCardValidator.enableValidation();

buttonAddNewPost.addEventListener('click', ()=> {
  editCardValidator.resetValidation();
  popupWithNewPost.open()
});
