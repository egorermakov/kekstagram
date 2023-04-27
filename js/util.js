const errorTamplate = document.querySelector('#error').content.querySelector('.error');
const successTamplate = document.querySelector('#success').content.querySelector('.success');

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};

const showMessage = (template) => {
  const fragment = document.createDocumentFragment();
  const message = template.cloneNode(true);
  fragment.append(message);
  document.body.append(fragment);

  const button = message.querySelector('[type="button"]');
  const closeMessage = () => message.remove();
  button.addEventListener('click', () => {
    closeMessage();
  });
  const onEsccapeClose = (evt) => {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  };

  // message.addEventListener('click', (evt) => {
  //   if (!evt.target.children[1]) {
  //     closeMessage();
  //   }
  // });

  document.body.addEventListener('keydown', onEsccapeClose);
};

const getDataError = () => {
  errorTamplate.querySelector('h2').style.lineHeight = '125%';
  errorTamplate.querySelector('h2').textContent = 'Ошибка загрузки данных. Перезагрузите сртраницу';
  errorTamplate.querySelector('button').textContent = 'Ок';
  showMessage(errorTamplate);
};

const showSuccess = () => {
  showMessage(successTamplate);
};

const showError = () => {
  showMessage(errorTamplate);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomPositiveInteger, checkStringLength, isEscapeKey, getDataError, showSuccess, showError, debounce};
