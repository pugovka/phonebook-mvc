'use strict';
import Observer from './observer';

export default class PhonebookView {
  constructor(addButton) {
    this.addRecordButtonClicked = new Observer(this);
    this.updateRecordButtonClicked = new Observer(this);
    this.deleteRecordButtonClicked = new Observer(this);
    this.citySelected = new Observer(this);
    const citiesInput = document.getElementById('cities-input');
    this.prevEditedRecord = false;

    // Add button handler
    document
      .getElementById('btn--add-record')
      .addEventListener('click', (event) => {
        event.preventDefault();
        const addRecordFormData = new FormData(document.getElementById('add-record-form'));
        this.addButtonClick(addRecordFormData);
      });

    citiesInput
      .addEventListener('change', () => {
        const cityId = this.getSelectedValueId(citiesInput.value,'#cities-datalist');
        this.selectCity(cityId);
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

  // Create edit record form
  renderEditRecordFields(recordId) {
    const record = document.getElementById('record-' + recordId);
    const recordProperties = record.querySelectorAll('.record__property');
    const formNode = document.createElement('form');
    const saveButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    const formBody = 
      '<input type="text" name="person_data[last_name]" value="' + recordProperties[0].innerHTML + '">' +
      '<input type="text" name="person_data[first_name]" value="' + recordProperties[1].innerHTML + '">' +
      '<input type="text" name="person_data[second_name]" value="' + recordProperties[2].innerHTML + '">' +
      '<input type="text" value="' + recordProperties[3].innerHTML + '" list="cities-datalist">' +
      '<input type="text" name="person_data[street_id]" value="' + recordProperties[4].innerHTML + '">' +
      '<input type="text" name="person_data[birth_date]" value="' + recordProperties[5].innerHTML + '">' +
      '<input type="text" name="person_data[phone_number]" value="' + recordProperties[6].innerHTML + '">';

    // Delete edit fields of previously edited record
    if (this.prevEditedRecord) {
      this.cancelButtonClick(this.prevEditedRecord);
    }
    saveButton.innerHTML = 'Save';
    cancelButton.innerHTML = 'Cancel';
    formNode.id = 'edit-record-form';
    formNode.className = 'edit-record-form';
    formNode.innerHTML = formBody;
    formNode.appendChild(saveButton);
    formNode.appendChild(cancelButton);

    // Get record values before edit
    const oldRecordData = new FormData(formNode);

    saveButton
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.updateButtonClick(recordId, formNode, oldRecordData);
      });

    cancelButton
      .addEventListener('click', (event) => {
        event.preventDefault();
        // Remove edit record form
        this.cancelButtonClick(record);
      });

    const recordParentNode = record.parentNode;

    recordParentNode.insertBefore(formNode, record);
    record.classList.add('hidden');
    this.prevEditedRecord = record;
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
    //Change city and street values to their ids
    const cityId = this.getSelectedValueId(
      formData.get('person_data[city_value]'),
      '#cities-datalist'
    );
    const streetId = this.getSelectedValueId(
      formData.get('person_data[street_value]'),
      '#streets-datalist'
    );

    // Delete unnecessary values
    formData.delete('person_data[city_value]');
    formData.delete('person_data[street_value]');
    // Add ids to the form
    formData.append('person_data[city_id]', cityId);
    formData.append('person_data[street_id]', streetId);
    // Dispatch add button clicked events
    this.addRecordButtonClicked.notify(formData);
  }

  editButtonClick(recordId) {
    //Show edit form for a record
    this.renderEditRecordFields(recordId);
  }

  updateButtonClick(recordId, editRecordForm, oldRecordData) {
    const recordData = new FormData(editRecordForm);

    // Check if record data has changed
    if (!isFormDataEqual(recordData, oldRecordData)) {
      // Dispatch update botton clicked events
      this.updateRecordButtonClicked.notify({ recordId, recordData });
    } else {
      // Remove edit record form
      const record = document.getElementById('record-' + recordId);
      this.cancelButtonClick(record, editRecordForm);
    }
  }

  cancelButtonClick(recordNode) {
    const editFormNode = document.getElementById('edit-record-form');

    recordNode.parentNode.removeChild(editFormNode);
    recordNode.classList.remove('hidden');
    // Unset previously edited record
    this.prevEditedRecord = false;

  }

  deleteButtonClick(recordId) {
    // Dispatch delete button clicked events
    this.deleteRecordButtonClicked.notify(recordId);
  }

  renderDataList(items, dataListId, propertyName) {
    let options = '';
    for (let i in items) {
      options +=
        '<option value="' + items[i][propertyName] + '" data-value-id="' + items[i].id + '">';
    }

    const datalist = document.getElementById(dataListId);
    datalist.innerHTML = options;
  }

  selectCity(selectedCityId) {
    // Dispatch select city events
    this.citySelected.notify(selectedCityId);
  }

  getSelectedValueId(inputValue, listSelector) {
    const selectedItem = document.querySelector(listSelector + ' option[value="' + inputValue + '"]');

    return selectedItem.getAttribute('data-value-id');
  }
}

const isFormDataEqual = (a, b) => {
  let aKeys = [];
  let bKeys = [];

  // Get property names from the first FormData()
  for (let key of a.keys()) {
    aKeys.push(key);
  }

  // Get property names from the second FormData()
  for (let key of b.keys()) {
    bKeys.push(key);
  }

  // Properties number should be equal
  if (aKeys.length != bKeys.length) {
    return false;
  }

  // Compare forms values
  for (let i = 0; i < aKeys.length; i++) {
    let key = aKeys[i];

    if (a.get(key) !== b.get(key)) {
      return false;
    }
  }

  return true;
}
