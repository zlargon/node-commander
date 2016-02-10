'use strict';
const path = require('path');

module.exports = class Commander {
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
