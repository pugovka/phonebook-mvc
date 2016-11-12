'use strict';
import Observer from './observer';

export default class PhonebookView {
  constructor(addButton) {
    this.addRecordButtonClicked = new Observer(this);
    this.updateRecordButtonClicked = new Observer(this);
    this.deleteRecordButtonClicked = new Observer(this);

    // Add button handler
    document
      .getElementById('btn--add-record')
      .addEventListener('click', (event) => {
        event.preventDefault();
        const addRecordFormData = new FormData(document.getElementById('add-record-form'));
        this.addButtonClick(addRecordFormData);
      });
  }

  render(records) {
    let str = '';
    for (let i in records) {
      str += 
        '<div class="record" id="record-' + records[i].id + '">' +
          '<div class="record__property">' + records[i].last_name + '</div>' +
          '<div class="record__property">' + records[i].first_name + '</div>' +
          '<div class="record__property">' + records[i].second_name + '</div>' +
          '<div class="record__property">' + records[i].city_name + '</div>' +
          '<div class="record__property">' + records[i].street_name + '</div>' +
          '<div class="record__property">' + records[i].birth_date + '</div>' +
          '<div class="record__property">' + records[i].phone_number + '</div>' +
          '<div class="record__property">'+
            '<button data-record-id="' + records[i].id + '" class="btn--edit-record">Edit</button>'+
            '<button data-record-id="' + records[i].id + '" class="btn--delete-record">X</button>'+
          '</div>' +
        '</div>';
    }

    const app = document.getElementById('phonebook-body');
    app.innerHTML = str;
    this.initHandlers();
  }

  renderEditRecordFields(recordId) {
    const record = document.getElementById('record-' + recordId);
    const recordProperties = record.querySelectorAll('.record__property');
    const lastNameValue = recordProperties[0].innerHTML;
    const phoneValue = recordProperties[6].innerHTML;
    const str = 
      '<form id="edit-record-form">' +
        '<input type="text" name="person_data[last_name]" id="test" value="' + lastNameValue + '">' +
        '<input type="text" name="person_data[phone_number]" value="' + phoneValue + '">' +
        '<button data-record-id="' + recordId + '" id="btn--update-record">Save</button>'+
        '<button id="btn--cancel-record-edit">Cancel</button>'+
      '</form>';

    record.innerHTML = str;
    formData = new FormData(document.getElementById('edit-record-form'));

    document
      .getElementById('btn--update-record')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.updateButtonClick(recordId, formData);
      });
  }

  initHandlers() {
    const self = this;
    const editButtons = document.getElementsByClassName('btn--edit-record');
    const deleteButtons = document.getElementsByClassName('btn--delete-record');

    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', function() {
        self.editButtonClick(this.getAttribute('data-record-id'));
      });
    }

    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', function() {
        self.deleteButtonClick(this.getAttribute('data-record-id'));
      });
    }
  }

  addButtonClick(formData) {
    // Dispatch add button clicked events
    this.addRecordButtonClicked.notify(formData);
  }

  editButtonClick(recordId) {
    //Show edit form for a record
    this.renderEditRecordFields(recordId);
  }

  updateButtonClick(recordId, formData) {
    // Dispatch update botton clicked events
    this.updateRecordButtonClicked.notify({ recordId: recordId, formData: formData });
  }

  deleteButtonClick(recordId) {
    // Dispatch delete button clicked events
    this.deleteRecordButtonClicked.notify(recordId);
  }
}
