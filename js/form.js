import {isEscapeKey, showSuccess, showError} from './util.js';
import {addScale, removeScale} from './scale.js';
import {addEffects, removeEffects} from './effects.js';
import {sendData} from './api.js';

const fileField = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const cancelButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const re = /^#[A-za-zА-Яа-яЁё0-9]{1,19}$/;

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === descriptionField;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
};

function showModal() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  addScale();
  addEffects();

  document.addEventListener('keydown', (evt) => {
    onPopupEscKeydown(evt);
  });
}

function hideModal() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', () => {
    onPopupEscKeydown();
  });
  cancelButton.removeEventListener('click', () => {
    hideModal();
  });

  form.reset();

  removeScale();
  removeEffects();
}

const pristine = new Pristine(form, {
  classTo: 'text',
  errorTextParent: 'text',
  errorTextClass: 'text__error',
});

const validateTags = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ');

  if (hashtags.length > 5) {
    return false;
  }

  for (let i = 0; i <= hashtags.length -1; i++) {
    if (hashtags[i] === '') {
      return true;
    }
    if (!re.test(hashtags[i])) {
      return false;
    }

    if (hashtags.filter((val) => val === hashtags[i]).length > 1) {
      return false;
    }
  }
  return true;
};

const addValidatorPristine = () => {
  pristine.addValidator(
    hashtagField,
    validateTags,
    'Неправильно заполнены хэштеги'
  );
};

const renderForm = () => {
  fileField.addEventListener('change', () => {
    showModal();
  });
  addValidatorPristine();
};

cancelButton.addEventListener('click', () => {
  hideModal();
});

hashtagField.addEventListener('focus', (evt) =>{
  evt.stopPropagation();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSuccess();
          unblockSubmitButton();
        },
        () => {
          showError();
          unblockSubmitButton();
          hideModal();
        },
        formData
      );
    }
  });
};

setUserFormSubmit(hideModal);

export {renderForm};
