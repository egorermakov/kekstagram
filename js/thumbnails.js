import {createPictures} from './data.js';
import {openBigPictureModal} from './full-photo.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesData = createPictures();

const picturesListFragment = document.createDocumentFragment();

picturesData.forEach((picture) => {
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
