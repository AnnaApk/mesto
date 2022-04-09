export class Card {
  constructor(title, link, likes, id, userId, ownerId, selector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._title = title;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._userId = userId;
    this._ownerId = ownerId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  deletePost = () => {
    this._element.remove();
  };

  _addLike() {
    this._likeButton.classList.add('element__like_active');
  };

  _deleteLike() {
    this._likeButton.classList.remove('element__like_active');
  };

  _addElementListeners = () => {
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._link));
  };

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId)
    return userHasLikedCard
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCount = this._element.querySelector('.element__likes-count');
    likeCount.textContent = this._likes.length;

    if (this.isLiked()) {
      this._addLike()
    } else {
      this._deleteLike()
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._cardImage = this._element.querySelector('.element__photo');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none'
    };

    this._addElementListeners();

    return this._element;
  }
}
