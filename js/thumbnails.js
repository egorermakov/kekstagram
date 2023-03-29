import { generatePhotos } from './data.js';

const list = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const photos = generatePhotos();



const addThumbnails = () => {

  const listFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = picture.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    listFragment.appendChild(thumbnail);
  });

  list.appendChild(listFragment);

};

export {addThumbnails};
