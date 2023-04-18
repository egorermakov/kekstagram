const EFFECTS = {
  none: {
    name: 'none',
    min: 0,
    max: 100,
    step: 0,
    unit: ''
  },
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const form = document.querySelector('.img-upload__form');
const effectsButtons = form .querySelectorAll('.effects__radio');
const previewImg = form .querySelector('.img-upload__preview');
const sliderValue = form.querySelector('.effect-level__value');
const sliderElement = form.querySelector('.effect-level__slider');
const sliderContainer = form.querySelector('.img-upload__effect-level');

const resetEffects = () => {
  sliderValue.value = EFFECTS.none.max;
  previewImg.className = `img-upload__preview effects__preview--${EFFECTS.none.name}`;
  previewImg.style.filter = `${EFFECTS.none.name}`;
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
  resetEffects();
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const changeSliderEffect = (effect) => {
  if(effect.name === EFFECTS.none.name){
    return resetEffects();
  }
  showSlider();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step
  });
};

const changeEffectPreview = (evt) => {
  if(evt.target.value === EFFECTS.none.name){
    hideSlider();
  }
  previewImg.className = `img-upload__preview effects__preview--${evt.target.value}`;
  changeSliderEffect(EFFECTS[evt.target.value]);
};

const changeEffectValue = () => {
  const effectValue = sliderElement.noUiSlider.get();
  const checkedEffects = document.querySelector('.effects__radio:checked');
  const effectName = EFFECTS[checkedEffects.value].name;
  const effectUnit = EFFECTS[checkedEffects.value].unit;
  previewImg.style.filter = `${effectName}(${effectValue}${effectUnit})`;
  sliderValue.value = effectValue;
};

const addSliderEffect = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS.none.min,
      max: EFFECTS.none.max,
    },
    start: EFFECTS.none.max,
    step: EFFECTS.none.step,
    connect: 'lower',
    format: {
      to: function(value){
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });

  hideSlider();

  sliderElement.noUiSlider.on('update', () => {
    changeEffectValue();
  });
};

const addEffects = () => {
  for (const effectsButton of effectsButtons) {
    effectsButton.addEventListener('click', (evt) => {
      changeEffectPreview(evt);
    });
  }

  addSliderEffect();
};

const removeEffects = () => {
  for (const effectsButton of effectsButtons) {
    effectsButton.removeEventListener('click', (evt) => {
      changeEffectPreview(evt);
    });
  }

  resetEffects();
  sliderElement.noUiSlider.destroy();
};

export { addEffects, removeEffects };
