'use strict';
import Observer from './observer';

export default class PhonebookView {
  constructor() {
    this.deleteRecordButtonClicked = new Observer(this);
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
    let self = this;
    let deleteButtons = document.getElementsByClassName('btn--delete-record');

    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', function() {
        self.deleteButtonClick(this.getAttribute('data-record-id'));
      });
    }
  }

  deleteButtonClick(recordId) {
    // Dispatch delete button clicked events
    this.deleteRecordButtonClicked.notify(recordId);
  }
}
