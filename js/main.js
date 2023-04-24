import {getDataError} from './util.js';
import {renderThumbnails} from './thumbnails.js';
import {renderForm} from './form.js';
import {getData} from './api.js';

getData(renderThumbnails, getDataError);
renderForm();
