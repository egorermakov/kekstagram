import {openBigPictureModal} from './full-photo.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (thumbnails) => {

  const picturesArray = document.querySelectorAll('.picture');
  picturesArray.forEach((elem) => {
    elem.remove();
  });

  const picturesListFragment = document.createDocumentFragment();

  thumbnails.forEach((picture) => {
    const thumbnail = pictureTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = picture.url;
    thumbnail.querySelector('.picture__likes').textContent = picture.likes;
    thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;

    thumbnail.addEventListener('click', () => {
      openBigPictureModal(picture);
    });

    picturesListFragment.appendChild(thumbnail);
  });

  picturesList.appendChild(picturesListFragment);
};

export {renderThumbnails};
