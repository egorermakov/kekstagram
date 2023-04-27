import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters');
const buttons = filters.querySelectorAll('.img-filters__button');

const getFilterDefault = (array) => array.slice();

const getFilterRandom = (array) => {
  const copy = array.slice();
  copy.sort(() => Math.random() - 0.5);
  return copy.slice(0, 10);
};

const getFilterDiscussed = (array) => array.slice().sort((a, b) => {
  if (a.comments.length < b.comments.length) {
    return 1;
  } else {
    return -1;
  }
});

const renderFilters = (thumbnails) => {
  renderThumbnails(thumbnails);
  const debouncedRender = debounce(renderThumbnails, RERENDER_DELAY);
  filters.classList.remove('img-filters--inactive');
  for (const button of buttons) {
    button.addEventListener('click', (evt) => {
      filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.toggle('img-filters__button--active');

      let result;
      switch(evt.target.id) {
        case 'filter-random':
          result = getFilterRandom(thumbnails);
          break;
        case 'filter-discussed':
          result = getFilterDiscussed(thumbnails);
          break;
        default:
          result = getFilterDefault(thumbnails);
          break;
      }
      debouncedRender(result);
    });
  }

};

export {renderFilters};
