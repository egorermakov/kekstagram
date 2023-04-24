import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const commentsDisplayed = bigPicture.querySelector('.comments-displayed');
const bigPictureCommentsCount = commentCount.querySelector('.comments-count');

const COMMENTS_SHOW = 5;

const getCommentsList = (element, visibleComments) => {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  const comments =  element.comments;

  comments.slice(0, visibleComments).forEach((comment) => {
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
  bigPicture.querySelector('.social__caption').textContent = element.description;
  bigPictureCommentsCount.textContent = element.comments.length;
  body.classList.add('modal-open');

  let commentsShow = COMMENTS_SHOW;
  commentsDisplayed.textContent = COMMENTS_SHOW;

  getCommentsList(element, COMMENTS_SHOW);

  if (element.comments.length < 5) {
    commentsLoader.classList.add('hidden');
    commentCount.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
    commentCount.classList.remove('hidden');
  }

  const onLoadMore = () => {
    commentsShow +=5;
    getCommentsList(element, commentsShow);
    commentsDisplayed.textContent = commentsShow;
    if (commentsShow >= +bigPictureCommentsCount.textContent) {
      commentsLoader.classList.add('hidden');
      commentsDisplayed.textContent = bigPictureCommentsCount.textContent;
    }

  };

  commentsLoader.addEventListener('click', onLoadMore);

  function closeBigPictureModal() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    commentsLoader.removeEventListener('click', onLoadMore);
  }

  bigPictureCloseElement.addEventListener ('click', () => {
    closeBigPictureModal();
  });

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPictureModal();
    }
  };

  document.addEventListener('keydown', (evt) => {
    onDocumentKeydown(evt);
  });
};

export {openBigPictureModal};
