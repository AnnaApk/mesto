import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { api } from '../components/Api.js';

import {
  buttonChangeProfileInfo,
  popupProfile,
  nameInput,
  jobInput,
  elements,
  popupNewPost,
  buttonAddNewPost,
  validationList,
  editAvatarButton,
  popupAvatar
} from '../utils/constants';

let userId = null

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.value = 'Сохранение ...'
  } else {
    button.value = 'Сохранить'
  }
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {

    user.setUserInfo({userName: res[0].name, userJob: res[0].about})
    userId = res[0]._id 
    user.setAvatar({avatar: res[0].avatar})

    res[1].reverse()
    if (userId) {
      res[1].forEach(data => {
        const card = creatCard({
          title:data.name,
          link:data.link,
          likes: data.likes,
          id: data._id,
          userId: userId,
          ownerId: data.owner._id
        })
        cardList.addItem(card)
      })
    }
  })
  .catch((err) => {
    console.log(err);
  })

const popupCard = new PopupWithImage('.popup_photo');  
popupCard.setEventListeners();

function creatCard({title, link, likes, id, userId, ownerId}) {
  const card = new Card(title, link, likes, id, userId, ownerId, '.element__template', 
  (title, link) => {
    popupCard.open(title, link);
  },
  (id) => {
    popupDeleteCard.open();
    popupDeleteCard.changeHandleSubmit(()=> {
      const submitDeleteCard = document.querySelector('.popup__submit_small')
      renderLoading(submitDeleteCard, true)
      api.deleteCard(id)
        .then(() => {
          card.deletePost();
        })
        .then(()=>{
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => renderLoading(submitDeleteCard, false))
    })
  },
  (id) => {
    if (card.isLiked()) {
      api.deleteLikes(id)
        .then((res) => {
          card.setLikes(res.likes)
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.addLikes(id)
        .then((res) => {
          card.setLikes(res.likes)
        })
        .catch((err) => {
          console.log(err);
        })
    }   
  }
  );
  const cardElement = card.generateCard();
  return cardElement
}

const cardList = new Section({ data: [], renderer: () => {} }, elements);

const popupWithNewPost = new PopupWithForm('.popup_new-post', (item, button) => {
  renderLoading(button, true)
  api.addNewCard(item.NewPlace, item.NewPhoto)
    .then((res) => {
      const cardElementNew = creatCard({
        title: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      })
      cardList.addItem(cardElementNew)
    })
    .then(() => {
      popupWithNewPost.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(button, false))
});

cardList.renderItems();

popupWithNewPost.setEventListeners();

const user = new UserInfo({
  selectorName: '.profile__user-name',
  selectorAbout: '.profile__job',
  selectorAvatar: '.profile__photo'
});

const popupUserProfile = new PopupWithForm('.popup_profile', (data, button) => {
  renderLoading(button, true)
  api.editProfile(data.userName,data.userJob)
    .then((res) => {
      user.setUserInfo({userName: res.name, userJob: res.about})
    })
    .then(() => {
      popupUserProfile.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(button, false))
});

popupUserProfile.setEventListeners();

buttonChangeProfileInfo.addEventListener('click', () => {
  popupUserProfile.open();
  const userData = user.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userJob;
})

const popupDeleteCard = new PopupWithForm('.popup_delete-post')
popupDeleteCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', (link, button) => {
  renderLoading(button, true)
  api.editAvatar(link.newAvatar)
    .then((res) => {
      user.setAvatar({avatar: res.avatar})
    })
    .then(() => {
      popupEditAvatar.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(button, false))
});
popupEditAvatar.setEventListeners();

const editProfileValidator = new FormValidator(validationList, popupProfile);
const editCardValidator = new FormValidator(validationList, popupNewPost);
const editAvatarValidator = new FormValidator(validationList, popupAvatar);

editProfileValidator.enableValidation();
editCardValidator.enableValidation();
editAvatarValidator.enableValidation();

buttonAddNewPost.addEventListener('click', ()=> {
  editCardValidator.resetValidation();
  popupWithNewPost.open()
});

editAvatarButton.addEventListener('click', () => {
  editAvatarValidator.resetValidation();
  popupEditAvatar.open();
})
