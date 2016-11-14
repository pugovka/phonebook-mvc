'use strict';
import Observer from './observer';

export default class PhonebookView {
  constructor(options) {
    // Create event listeners objects
    this.addRecordButtonClicked = new Observer(this);
    this.updateRecordButtonClicked = new Observer(this);
    this.deleteRecordButtonClicked = new Observer(this);
    this.citySelectedAddForm = new Observer(this);
    this.citySelectedEditForm = new Observer(this);

    this.prevEditedRecord = false;
    const citiesInputAddForm = document.getElementById('cities-input');

    Object.assign(this, options);

    // Add button handler
    document
      .getElementById('btn--add-record')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.addButtonClick(document.getElementById('add-record-form'));
      });

    // Change city handler on an add record form
    citiesInputAddForm
      .addEventListener('change', () => {
        const cityId = this._getSelectedValueId(citiesInputAddForm.value, this.citiesDatalistSelector);
        this.selectCityAddForm(cityId);
      });
  }

  _validateRequiredFields(form) {
    let isValid = true;
    for (let i = 0; i < form.elements.length; i++) {
      if(form.elements[i].hasAttribute('required')) {
        if (form.elements[i].value === '') {
          isValid = false;
          if (!form.elements[i].classList.contains('input-required')) {
            form.elements[i].classList.add('input-required');
          }
        } else if (form.elements[i].classList.contains('input-required')) {
          form.elements[i].classList.remove('input-required');
        }
      }
    }

    return isValid;
  }

  // Change form values to their ids from datalists
  _convertFormDataValue(formData, dataListSelector, formDataValueKey, formDataIdKey) {
    const selectedValue = formData.get(formDataValueKey);

    //Change city and street values to their ids
    const selectedId = this._getSelectedValueId(
      selectedValue,
      dataListSelector
    );

    // Return if value is set and not from existing values list
    if (selectedValue && !selectedId) {
      return false;
    }

    // Delete values
    formData.delete(formDataValueKey);
    // Add ids to the form
    formData.append(formDataIdKey, selectedId);

    return formData;
  }

  _renderEditRecordFields(recordId) {
    const self = this;
    const record = document.getElementById('record-' + recordId);
    const recordProperties = record.querySelectorAll('.record__property');
    const formNode = document.createElement('form');
    const buttonsArea = document.createElement('div');
    const saveButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    const formBody = 
      '<input type="text" name="person_data[last_name]" value="' + recordProperties[0].innerHTML + '" required>' +
      '<input type="text" name="person_data[first_name]" value="' + recordProperties[1].innerHTML + '">' +
      '<input type="text" name="person_data[second_name]" value="' + recordProperties[2].innerHTML + '">' +
      '<input type="text" value="' + recordProperties[3].innerHTML +
      '" list="cities-datalist" id="cities-input-edit-form" name="person_data[city_value]">' +
      '<input type="text" value="' + recordProperties[4].innerHTML +
      '" list="streets-datalist-edit-form" name="person_data[street_value]">' +
      '<datalist id="streets-datalist-edit-form"></datalist>' +
      '<input type="date" name="person_data[birth_date]" value="' + recordProperties[5].innerHTML + '">' +
      '<input type="tel" name="person_data[phone_number]" value="' +
      recordProperties[6].innerHTML + '" maxlength="11" required>';

    // Delete edit fields of previously edited record
    if (this.prevEditedRecord) {
      self.cancelButtonClick(this.prevEditedRecord);
    }

    saveButton.innerHTML = 'Save';
    cancelButton.innerHTML = 'Back';
    formNode.id = 'edit-record-form';
    formNode.className = 'edit-record-form';
    formNode.innerHTML = formBody;
    buttonsArea.className = 'record__property';
    buttonsArea.appendChild(saveButton);
    buttonsArea.appendChild(cancelButton);
    formNode.appendChild(buttonsArea);

    // Get record values before edit
    const oldRecordData = new FormData(formNode);

    saveButton
      .addEventListener('click', (event) => {
        event.preventDefault();
        self.updateButtonClick(recordId, formNode, oldRecordData);
      });

    cancelButton
      .addEventListener('click', (event) => {
        event.preventDefault();
        // Remove edit record form
        self.cancelButtonClick(record);
      });

    const recordParentNode = record.parentNode;

    recordParentNode.insertBefore(formNode, record);
    record.classList.add('hidden');
    self.prevEditedRecord = record;

    const citiesInputEditForm = document.getElementById('cities-input-edit-form');

    citiesInputEditForm
      .addEventListener('change', function() {
        self.selectCityEditForm(this);
      });

    // Add datalist street options
    self.selectCityEditForm(citiesInputEditForm);
  }

  _initHandlers() {
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

  _formErrorMessage(nodeSelector, errorText, errorNode) {
    const node = document.querySelector(nodeSelector);
    const systemMessage = document.createElement('div');

    systemMessage.className = 'form-error-message';
    systemMessage.innerHTML = errorText;

    if (errorNode) {
      node.appendChild(systemMessage);
    } else {
      node.parentNode.appendChild(systemMessage);
    }
  }

  _getSelectedValueId(inputValue, listSelector) {
    const selectedItem = document.querySelector(listSelector + ' option[value="' + inputValue + '"]');

    return (selectedItem) ? selectedItem.getAttribute('data-value-id') : false;
  }

  _deleteErrorMessages() {
    const errorMessagess = document.querySelectorAll('.form-error-message');
    if (errorMessagess) {
      errorMessagess.forEach(element => {
        element.remove();
      });
    }
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
            '<button data-record-id="' + records[i].id + '" class="btn--delete-record">Del.</button>'+
          '</div>' +
        '</div>';
    }

    // Edit form closed, unset prevEditedRecord
    if (this.prevEditedRecord) {
      this.prevEditedRecord = false;
    }

    const app = document.getElementById('phonebook-body');
    app.innerHTML = str;
    this._initHandlers();
  }

  addButtonClick(form) {
    if (!this._validateRequiredFields(form)) {
      return;
    }

    let formData = new FormData(form);

    this._deleteErrorMessages();

    formData = 
      this._convertFormDataValue(
        formData,
        this.citiesDatalistSelector,
        'person_data[city_value]',
        'person_data[city_id]'
      );

    if (!formData) {
      this._formErrorMessage(
        this.citiesInputAddForm,
        'Please select city from the list'
      );
      return;
    }

    formData = 
      this._convertFormDataValue(
        formData, this.streetsDatalistSelectorAddForm,
        'person_data[street_value]',
        'person_data[street_id]'
      );

    if (!formData) {
      this._formErrorMessage(
        this.streetsInputAddForm,
        'Please select street from the list'
      );
      return;
    }

    // Clear form fields
    form.reset();
    // Dispatch add button clicked events
    this.addRecordButtonClicked.notify(formData);
  }

  editButtonClick(recordId) {
    //Show edit form for a record
    this._renderEditRecordFields(recordId);
  }

  updateButtonClick(recordId, editRecordForm, oldRecordData) {
    if (!this._validateRequiredFields(editRecordForm)) {
      return;
    }

    let recordData = new FormData(editRecordForm);
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

    this._deleteErrorMessages();

    // Check if record data has changed
    if (!isFormDataEqual(recordData, oldRecordData)) {
      // Get city id by it's value
      recordData = 
        this._convertFormDataValue(
          recordData,
          this.citiesDatalistSelector,
          'person_data[city_value]',
          'person_data[city_id]'
        );

      if (!recordData) {
        this._formErrorMessage(
          this.errorBlockSelector,
          'Please select city from the list',
          true
        );
        return;
      }

      // Get street id by it's value
      recordData = 
        this._convertFormDataValue(
          recordData,
          this.streetsDatalistSelectorEditForm,
          'person_data[street_value]',
          'person_data[street_id]'
        );

      if (!recordData) {
        this._formErrorMessage(
          this.errorBlockSelector,
          'Please select street from the list',
          true
        );
        return;
      }

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

  selectCityAddForm(selectedCityId) {
    // Dispatch select city from add form events
    this.citySelectedAddForm.notify(selectedCityId);
  }

  selectCityEditForm(citiesInput) {
    const selectedCityId = this._getSelectedValueId(citiesInput.value, this.citiesDatalistSelector);

    // Dispatch select city from edit form events
    this.citySelectedEditForm.notify(selectedCityId);
  }
}
