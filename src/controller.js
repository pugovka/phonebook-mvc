'use strict';

export default class PhonebookController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    // Listen to add button click from view
    this._view.addRecordButtonClicked.attach((sender, form) => {
      // Add record to db using model
      this.addRecord(form);
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

  addRecord(form) {
    this._model.addRecord(form);
  }

  editRecord(recordId) {
    this._model.editRecord(recordId);
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
