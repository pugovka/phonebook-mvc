'use strict';
import PhonebookModel from './model';
import PhonebookView from './view';
import PhonebookController from './controller';
import style from './styles.scss';

// Server url
const url = 'http://127.0.0.1:8000/edsa-phonebook/php/';
const controllerOptions = {
  citiesDatalistId: 'cities-datalist',
  cityPropertyName: 'city_name',
  streetsDatalistIdAddForm: 'streets-datalist',
  streetsDatalistIdEditForm: 'streets-datalist-edit-form',
  streetPropertyName: 'street_name'
};
const viewOptions = {
  citiesDatalistSelector: '#cities-datalist',
  streetsDatalistSelectorAddForm: '#streets-datalist',
  streetsDatalistSelectorEditForm: '#streets-datalist-edit-form',
  errorBlockSelector: '.edit-form-error',
  citiesInputAddForm: '#cities-input',
  streetsInputAddForm: '#streets-input',
  inputErrorClass: 'input-required'
}

const model = new PhonebookModel(url);
const view = new PhonebookView(viewOptions);
const controller = new PhonebookController(model, view, controllerOptions);
