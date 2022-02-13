const buttonChangeProfileInfo = document.querySelector('.profile__change');
const closeProfilePopup = document.querySelector('.popup__close_profile');
const popupProfile = document.querySelector('.popup_profile');
const profileForm = document.querySelector('.popup__body');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
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
const buttonSubmitAddNewPost = popupNewPost.querySelector('.popup__submit');

const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePopupPhoto = document.querySelector('.popup__close_photo');
const popupImageOpen = document.querySelector('.popup__image');
const popupTitleOfImage = document.querySelector('.popup__photo-title');

const popups = document.querySelectorAll('.popup');

popups.forEach((el) => {
  el.addEventListener('mousedown', (evt) => {
      if (!evt.target.closest('.popup__overlay')) {
        closePopup(el);
      };
      if (evt.target.classList.contains('popup__close')) {
        closePopup(el);
      };
  });
});

function openPopUpProfileFieled() {
  nameInput.value = profileName.innerText;
  jobInput.value = profileJob.innerText;
};

function openPopup(el) {
  el.classList.add('popup_active');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(el) {
  el.classList.remove('popup_active');
  document.removeEventListener('keydown', closeByEscape);
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

function getElement(name, link) {
  const newElement = elementTemplate.cloneNode(true);
  const newElementPhoto = newElement.querySelector('.element__photo');
  newElement.querySelector('.element__title').textContent = name;
  newElementPhoto.src = link;
  newElementPhoto.alt = name;
  addElementListeners(newElement);

  return newElement;
};

function renderElement(el, array) {
  array.prepend(el);
};

function handleAddingPostSubmit (evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = photoInput.value;
  renderElement(getElement(name, link), elements);
  closePopup(popupNewPost);
  submitAddingPost.reset();

  buttonSubmitAddNewPost.setAttribute('disabled', 'true');
  buttonSubmitAddNewPost.classList.add('popup__submit_disabled');
};

function deletePost(evt) {
  evt.target.closest('.element').remove();
};

function toggleLike(el) {
  el.target.classList.toggle('element__like_active');
};

function openPhotoPopup(evt) {
  const titlePhoto = evt.target.closest('.element').querySelector('.element__title').textContent;
  popupImageOpen.src = evt.target.src;
  popupImageOpen.alt = titlePhoto;
  popupTitleOfImage.textContent = titlePhoto;

  openPopup(popupPhoto);
};

function addElementListeners(el) {
  el.querySelector('.element__photo').addEventListener('click', openPhotoPopup);
  el.querySelector('.element__like').addEventListener('click', toggleLike);
  el.querySelector('.element__delete').addEventListener('click', deletePost);
};

initialCards.forEach((el)=> {
  renderElement(getElement(el.name, el.link), elements);
});

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpenNow = document.querySelector('.popup_active');
    closePopup(popupOpenNow);
  };
};

buttonChangeProfileInfo.addEventListener('click', function() {
  openPopup(popupProfile);
  openPopUpProfileFieled();
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

buttonAddNewPost.addEventListener('click', ()=> openPopup(popupNewPost));

submitAddingPost.addEventListener('submit', handleAddingPostSubmit);
