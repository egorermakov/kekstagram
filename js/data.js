import {getRandomPositiveInteger} from './util.js'

const NUMBER_OF_PHOTOS = 25;

const PHOTO_DESCRIPTIONS = [
  'Я, снова я и опять я',
  'Просто я',
  'Но сначала селфи!',
  'Типичный я',
  'Остаюсь верен традициям - воскресное селфи',
  'Мыслями на пляже.',
  'Я после марафона... любимого сериала.',
];

const NAMES = [
  'Вася',
  'Коля',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let commentsCount = 1;

const createComment = (commentId) => ({
  id: commentId,
  avatar: `img/avatar-${  getRandomPositiveInteger(1, 6)  }.svg`,
  message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
});

const getRandomComments = () => {
  const comments = [];
  for (let i = 1; i <= getRandomPositiveInteger(1, 10); i++) {
    comments.push(createComment(commentsCount));
    commentsCount += 1;
  }
  return comments;
};

const createPhoto = (photoId) => ({
  return: {
    id: photoId,
    url: `photos/${  photoId  }.jpg`,
    description: PHOTO_DESCRIPTIONS[getRandomPositiveInteger(0, PHOTO_DESCRIPTIONS.length - 1)],
    likes: getRandomPositiveInteger(15, 200),
    comments: getRandomComments(),
  }
});

const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= NUMBER_OF_PHOTOS; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

export {generatePhotos};