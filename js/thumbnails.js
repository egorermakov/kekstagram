import { createPhotoData } from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const picturesListData = createPhotoData();

const addThumbnails = () => {

  const picturesListFragment = document.createDocumentFragment();

  picturesListData.forEach((element) => {
    const pictureThumbnail = picture.cloneNode(true);
    pictureThumbnail.querySelector('.picture__img').src = element.url;
    pictureThumbnail.querySelector('.picture__likes').textContent = element.likes;
    pictureThumbnail.querySelector('.picture__comments').textContent = element.comments.length;
    picturesListFragment.appendChild(pictureThumbnail);
  });

  picturesList.appendChild(picturesListFragment);

};

export {addThumbnails};
