'use strict';
import PhonebookModel from './model';
import PhonebookView from './view';
import PhonebookController from './controller';
import style from './styles.scss';

const model = new PhonebookModel();
const view = new PhonebookView();
const controller = new PhonebookController(model, view);
