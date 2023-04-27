import { getDataError } from './util.js';
import { renderForm } from './form.js';
import { getData } from './api.js';
import { renderFilters } from './filters.js';

getData(renderFilters, getDataError);
renderForm();
