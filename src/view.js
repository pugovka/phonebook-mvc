'use strict';
import Observer from './observer';

export default class PhonebookView {
  constructor(addButton) {
    this.addRecordButtonClicked = new Observer(this);
    this.editRecordButtonClicked = new Observer(this);
    this.deleteRecordButtonClicked = new Observer(this);

    // Add button handler
    document
      .getElementById('btn--add-record')
      .addEventListener('click', (event) => {
        event.preventDefault();
        const addRecordForm = document.getElementById('add-record-form');
        self.addButtonClick(addRecordForm);
      });
  }

  render(records) {
    let str = '';
    for (let i in records) {
      str += 
        '<div class="record">' +
          '<div class="record__property">' + records[i].last_name + '</div>' +
          '<div class="record__property">' + records[i].first_name + '</div>' +
          '<div class="record__property">' + records[i].second_name + '</div>' +
          '<div class="record__property">' + records[i].city_name + '</div>' +
          '<div class="record__property">' + records[i].street_name + '</div>' +
          '<div class="record__property">' + records[i].birth_date + '</div>' +
          '<div class="record__property">' + records[i].phone_number + '</div>' +
          '<div class="record__property">'+
            '<button data-record-id="' + records[i].id + '" class="btn--delete-record">X</button>'+
          '</div>' +
        '</div>';
    }

    const app = document.getElementById('phonebook-body');
    app.innerHTML = str;

    this.initHandlers();
  }

  initHandlers() {
    const self = this;
    const deleteButtons = document.getElementsByClassName('btn--delete-record');

    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', function() {
        self.deleteButtonClick(this.getAttribute('data-record-id'));
      });
    }

    document
      .getElementById('btn--add-record')
      .addEventListener('click', (event) => {
        event.preventDefault();

        const addRecordForm = document.getElementById('add-record-form');

        self.addButtonClick(addRecordForm);
      });

  }

  addButtonClick(form) {
    this.addRecordButtonClicked.notify(form);
  }

  deleteButtonClick(recordId) {
    // Dispatch delete button clicked events
    this.deleteRecordButtonClicked.notify(recordId);
  }
}
