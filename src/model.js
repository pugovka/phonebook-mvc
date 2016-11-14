'use strict';

export default class PhonebookModel {
  constructor(url) {
    this.url = url;
  }

  getRecords() {
    return this._request(this.url + 'get-records-list.php',{ 
      mode: 'cors'
    });
  }

  addRecord(record) {
    return this._request(this.url + 'add-record.php', { 
      mode: 'cors',
      method: 'post',
      body: record
    });
  }

  deleteRecord(id) {
    const record = new FormData();

    record.append('record_id', id);
    return this._request(this.url + 'delete-record.php', { 
      mode: 'cors',
      method: 'post',
      body: record
    });
  }

  editRecord(id, record) {
    record.append('record_id', id);
    return this._request(this.url + 'edit-record.php', { 
      mode: 'cors',
      method: 'post',
      body: record
    });
  }

  getCitiesList() {
    return this._request(this.url + 'get-cities-list.php',{ 
      mode: 'cors'
    });
  }

  getStreetsList(cityId) {
    const city = new FormData();

    city.append('city_id', cityId);
    return this._request(this.url + 'get-streets-list.php',{ 
      mode: 'cors',
      method: 'post',
      body: city
    });
  }

  // Wrap fetch
  _request(url, settings, result) {
    return fetch(url, settings)
      .then(this._status)
      .then(
        (response) => response.json()
      )
      .catch(
        (error) => {
          console.log('fetch error: ', error)
        }
      );
  }

  // Check request status
  _status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
}
