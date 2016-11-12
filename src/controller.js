'use strict';

export default class PhonebookController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    this.renderRecords();

    // Listen to add button click from view
    this._view.addRecordButtonClicked.attach((sender, formData) => {
      // Add record to db using model
      this.addRecord(formData);
      // Update records list
      this.renderRecords();
    });

    // Listen to update record button click from view
    this._view.updateRecordButtonClicked.attach((sender, data) => {
      // Edit record in db using model
      this.editRecord(data.recordId, data.recordData);
      // Update records list
      this.renderRecords();
    });

    // Listen to delete record button click from view
    this._view.deleteRecordButtonClicked.attach((sender, recordId) => {
      // Delete record from db using model
      this.deleteRecord(recordId);
      // Update records list
      this.renderRecords();
    });
  }

  addRecord(formData) {
    this._model.addRecord(formData);
  }

  editRecord(recordId, formData) {
    this._model.editRecord(recordId, formData);
  }

  deleteRecord(recordId) {
    this._model.deleteRecord(recordId);
  }

  renderRecords() {
    const recordsPromise = this._model.getRecords();

    recordsPromise
      .then(records => {
        this._view.render(records);
      });
  }
}
