'use strict';

export default class PhonebookController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    // Listen to delete record button click from view
    this._view.deleteRecordButtonClicked.attach((sender, recordId) => {
      // Delete record from bd using model
      this.deleteRecord(recordId);
    });
  }

  deleteRecord(recordId) {
    this._model.deleteRecord(recordId);
  }
}
