'use strict';

export default class PhonebookController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    const citiesDatalistId = 'cities-datalist';
    const cityPropertyName = 'city_name';
    const streetsDatalistIdAddForm = 'streets-datalist';
    const streetsDatalistIdEditForm = 'streets-datalist-edit-form';
    const streetPropertyName = 'street_name';

    this.renderRecords();
    this.renderCitiesList(citiesDatalistId, cityPropertyName);

    // Listen to city input change
    this._view.citySelectedAddForm.attach((sender, cityId) => {
      this.renderStreetsList(cityId, streetsDatalistIdAddForm, streetPropertyName);
    });

    this._view.citySelectedEditForm.attach((sender, cityId) => {
      this.renderStreetsList(cityId, streetsDatalistIdEditForm, streetPropertyName);
    });

    // Listen to add button click from view
    this._view.addRecordButtonClicked.attach((sender, formData) => {
      // Add record to db using model
      this.addRecord(formData);
    });

    // Listen to update record button click from view
    this._view.updateRecordButtonClicked.attach((sender, data) => {
      // Edit record in db using model
      this.editRecord(data.recordId, data.recordData);
    });

    // Listen to delete record button click from view
    this._view.deleteRecordButtonClicked.attach((sender, recordId) => {
      // Delete record from db using model
      this.deleteRecord(recordId);
    });
  }

  addRecord(formData) {
    this._model.addRecord(formData)
      .then(() => {
        // Update records list
        this.renderRecords();
      });
  }

  editRecord(recordId, formData) {
    this._model.editRecord(recordId, formData)
      .then(() => {
        // Update records list
        this.renderRecords();
      });
  }

  deleteRecord(recordId) {
    this._model.deleteRecord(recordId)
    .then(() => {
      // Update records list
      this.renderRecords();
    });
  }

  renderRecords() {
    const recordsPromise = this._model.getRecords();

    recordsPromise
      .then(records => {
        this._view.render(records);
      });
  }

  renderCitiesList(citiesDatalistId, cityPropertyName) {
    const citiesListPromise = this._model.getCitiesList();

    citiesListPromise
      .then(citiesList => {
        this._view.renderDataList(citiesList, citiesDatalistId, cityPropertyName);
      });
  }

  renderStreetsList(cityId, streetsDatalistId, streetPropertyName) {
    const streetsListPromise = this._model.getStreetsList(cityId);

    streetsListPromise
      .then(streetsList => {
        this._view.renderDataList(streetsList, streetsDatalistId, streetPropertyName);
      });
  }
}
