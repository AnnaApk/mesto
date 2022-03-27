export class Card {
  constructor(title, link, selector, handleCardClick) {
    this._title = title;
    this._link = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _deletePost = () => {
    this._element.remove();
  };
  
  _toggleLike = () => {
    this._likeButton.classList.toggle('element__like_active');
  };

  _addElementListeners = () => {
    this._likeButton.addEventListener('click', this._toggleLike);
    this._deleteButton.addEventListener('click', this._deletePost);
    this._card.addEventListener('click', ()=>this._handleCardClick(this._title, this._link));
  };

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._card = this._element.querySelector('.element__photo');

    this._card.src = this._link;
    this._element.querySelector('.element__title').textContent = this._title;

    this._addElementListeners();

    return this._element;
  }
}
