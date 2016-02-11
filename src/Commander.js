'use strict';
const path = require('path');
const Flag = require('./Flag');

module.exports = class Commander {
  constructor () {
    this._option = {};
  }

  option (flags, description, action) {
    const o = Flag.parse(flags);
    o.desc = description;
    o.action = typeof action === 'function' ? action.bind(this) : null;

    // short
    if (o.short !== null && this._option.hasOwnProperty(o.short)) {
      throw new TypeError(`option '${o.short}' is repeated`);
    }
    this._option[o.short] = o;

    // long
    if (o.long !== null && this._option.hasOwnProperty(o.long)) {
      throw new TypeError(`option '${o.long}' is repeated`);
    }
    this._option[o.long] = o;

    return this;  // chaining pattern
  }

  parse (_args) {
    if (!Array.isArray(_args)) {
      throw new TypeError('argument should be an array');
    }

    if (_args.length < 2) {
      throw new TypeError('argument should be at least two items');
    }

    const name = path.basename(_args[1]);
    const args = _args.slice(2);

    return {
      name,
      args
    };
  }
};
