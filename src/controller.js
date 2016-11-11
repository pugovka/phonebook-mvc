'use strict';

export default class PhonebookController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    // Listen to add button click from view
    this._view.addRecordButtonClicked.attach((sender, form) => {
      console.log(form);
      this.addRecord(form);
    });

    // Listen to delete record button click from view
    this._view.deleteRecordButtonClicked.attach((sender, recordId) => {
      // Delete record from bd using model
      this.deleteRecord(recordId);
    });
  }

  addRecord(form) {
    this._model.addRecord(form);
  }

  deleteRecord(recordId) {
    this._model.deleteRecord(recordId);
  }
}
