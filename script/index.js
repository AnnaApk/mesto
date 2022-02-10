const buttonChangeProfileInfo = document.querySelector('.profile__change');
const closeProfilePopup = document.querySelector('.popup__close_profile');
const popupProfile = document.querySelector('.popup_profile');
const formElement = document.querySelector('.popup__body');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__job');

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
const popupNewPost = document.querySelector('.popup_new-post');
const buttonAddNewPost = document.querySelector('.profile__add-post');
const closeAddPostPopup = document.querySelector('.popup__close_add-post');
const placeInput = popupNewPost.querySelector('.popup__input_type_place');
const photoInput = popupNewPost.querySelector('.popup__input_type_photo');
const submitAddingPost = popupNewPost.querySelector('.popup__body');

const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePopupPhoto = document.querySelector('.popup__close_photo');

function openPopUpFieled() {
  nameInput.value = profileName.innerText;
  jobInput.value = profileJob.innerText;
};

function openPopup(el) {
  el.classList.add('popup_active');
};

function closePopup(el) {
  el.classList.remove('popup_active');
};

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

function getElement(name, link) {
  const newElement = elementTemplate.cloneNode(true);
  newElement.querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__photo').src = link;
  newElement.querySelector('.element__photo').alt = name;
  addListeners(newElement);

  return newElement;
};

function renderElement(el, array) {
  array.prepend(el);
};

function formSubmitAddingPost (evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = photoInput.value;
  renderElement(getElement(name, link), elements);
  closePopup(popupNewPost);
  submitAddingPost.reset();
};

function deletePost(evt) {
  evt.target.closest('.element').remove();
};

function toggleLike(el) {
  el.target.classList.toggle('element__like_active');
};

function fieldPopupPhoto(evt) {
  const titlePhoto = evt.target.closest('.element').querySelector('.element__title').textContent;
  document.querySelector('.popup__photo').src = evt.target.src;
  document.querySelector('.popup__photo').alt = titlePhoto;
  document.querySelector('.popup__photo-title').textContent = titlePhoto;

  openPopup(popupPhoto);
  closePopupOverlay(popupPhoto);
};

function addListeners(el) {
  el.querySelector('.element__photo').addEventListener('click', fieldPopupPhoto);
  el.querySelector('.element__like').addEventListener('click', toggleLike);
  el.querySelector('.element__delete').addEventListener('click', deletePost);
};

initialCards.forEach((el)=> {
  renderElement(getElement(el.name, el.link), elements);
});

function closePopupOverlay(el) {
  el.addEventListener('click', (evt)=> {
    if (!evt.target.closest('.popup__body')) {
      closePopup(evt.target.closest('.popup'));
    };
  });
};

buttonChangeProfileInfo.addEventListener('click', function() {
  openPopup(popupProfile);
  openPopUpFieled();
  closePopupOverlay(popupProfile);
});

formElement.addEventListener('submit', formSubmitHandler);

closeProfilePopup.addEventListener('click', () => closePopup(popupProfile));

buttonAddNewPost.addEventListener('click', function() {
  openPopup(popupNewPost);
  closePopupOverlay(popupNewPost);
});

closeAddPostPopup.addEventListener('click', ()=> closePopup(popupNewPost));
submitAddingPost.addEventListener('submit', formSubmitAddingPost);

buttonClosePopupPhoto.addEventListener('click', ()=> closePopup(popupPhoto));

document.addEventListener('keydown', (evt)=> {
  if (evt.key === 'Escape') {
    const popupOpend = document.querySelector('.popup_active');
    closePopup(popupOpend);
  } 
});
