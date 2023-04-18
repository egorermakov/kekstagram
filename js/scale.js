const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const DEFAULT_SCALE_PERCENT = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');

scaleControlValue.value = `${DEFAULT_SCALE_PERCENT}%`;

const changeScale = (evt) => {
  evt.preventDefault();
  const scaleValue = parseInt(scaleControlValue.value, 10);
  let percent;
  if (evt.target.classList.contains('scale__control--smaller')) {
    percent = scaleValue !== SCALE_MIN ? scaleValue - SCALE_STEP : scaleValue;
  } else {
    percent = scaleValue !== SCALE_MAX ? scaleValue + SCALE_STEP : scaleValue;
  }
  scaleControlValue.value = `${percent}%`;
  previewImg.style.transform = `scale(${percent / 100})`;
};

const setDefaultScale = () => {
  scaleControlValue.value = `${SCALE_MAX}%`;
  previewImg.style.transform = `scale(${SCALE_MAX / 100})`;
};

const addScale = () => {
  scaleControlSmaller.addEventListener('click', (evt) => {
    changeScale(evt);
  });
  scaleControlBigger.addEventListener('click', (evt) => {
    changeScale(evt);
  });
};

const removeScale = () => {
  scaleControlSmaller.removeEventListener('click', (evt) => {
    changeScale(evt);
  });
  scaleControlBigger.removeEventListener('click', (evt) => {
    changeScale(evt);
  });
  setDefaultScale();
};

export { addScale, removeScale };
