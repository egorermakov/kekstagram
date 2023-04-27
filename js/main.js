import { getDataError } from './util.js';
import { renderForm } from './form.js';
import { getData } from './api.js';
import { renderFilters } from './filters.js';
import './preview.js';

getData(renderFilters, getDataError);
renderForm();
