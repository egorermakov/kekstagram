import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel')
const commentsList = document.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

const getCommentsList = (element) => {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  const comments =  element.comments;

  comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentsList.appendChild(commentItem);
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    commentItem.appendChild(commentAvatar);
    const commentText = document.createElement('p');
    commentText.textContent = comment.message;
    commentItem.appendChild(commentText);
  });
};

const openBigPictureModal = (element) => {
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = element.url;
  bigPicture.querySelector('.likes-count').textContent = element.likes;
  bigPicture.querySelector('.comments-count').textContent = element.comments.length;
  getCommentsList(element);
  bigPicture.querySelector('.social__caption').textContent = element.description;

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
};

const closeBigPictureModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown',onDocumentKeydown);
};

bigPictureCloseElement.addEventListener ('click', () => {
  closeBigPictureModal();
});

document.addEventListener('keydown', (evt) => {
  onDocumentKeydown(evt);
});

export {openBigPictureModal};
