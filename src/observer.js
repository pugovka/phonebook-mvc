'use strict';

// Implementing the Observer pattern
export default class Observer {
  constructor(sender) {
    this._sender = sender;
    this._listeners = [];
  }

  // Add event listener
  attach(listener) {
    this._listeners.push(listener);
  }

  notify(args) {
    let index;

    for (index = 0; index < this._listeners.length; index += 1) {
      // Dispatch an event
      this._listeners[index](this._sender, args);
    }
  }
}
