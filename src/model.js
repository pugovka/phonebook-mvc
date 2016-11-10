'use strict';

export default class PhonebookModel {
  getRecords() {
    request('http://127.0.0.1:8000/edsa-phonebook/php/get-records-list.php',{ 
      mode: 'cors'
    });
  };

  addRecord(form) {
    const record = new FormData(form);
    request('http://127.0.0.1:8000/edsa-phonebook/php/add-record.php', { 
      mode: 'cors',
      method: 'post',
      body: record
    });
  };

  deleteRecord(id) {
    const record = new FormData();
    record.append('record_id', id);

    request('http://127.0.0.1:8000/edsa-phonebook/php/delete-record.php', { 
      mode: 'cors',
      method: 'post',
      body: record
    });
  };

  editRecord(id) {
  };
}

// Wrap fetch
function request(url, settings) {
  fetch(url, settings)
    .then(status)
    .then(
      (response) => response.text()
    )
    .then(
      (responseText) => {
        console.log(responseText);
      }
    )
    .catch(
      (error) => {
        console.log('fetch error: ', error)
      }
    );
}

// Check request status
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
