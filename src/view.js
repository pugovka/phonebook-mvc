'use strict';

export default class PhonebookView {
  render(records) {
    let str = '';
    for (let i in records) {
      str += '<div class="record" data-record-id="' + records[i].id +'">' +
        '<div class="record__property">' + records[i].last_name + '</div>' +
        '<div class="record__property">' + records[i].first_name + '</div>' +
        '<div class="record__property">' + records[i].second_name + '</div>' +
        '<div class="record__property">' + records[i].city_name + '</div>' +
        '<div class="record__property">' + records[i].street_name + '</div>' +
        '<div class="record__property">' + records[i].birth_date + '</div>' +
        '<div class="record__property">' + records[i].phone_number + '</div>' +
        '<div class="record__property"><button class="btn--delete-record">X</button></div>' +
        '</div>';
    }

    const app = document.getElementById('phonebook-body');
    app.innerHTML = str;
  }
}
