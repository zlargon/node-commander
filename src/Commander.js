'use strict';
const path = require('path');
const Flag = require('./Flag');

module.exports = class Commander {
  constructor () {
    this._usage   = '';
    this._name    = path.basename(process.argv[1]);
    this._version = '';
    this._option  = {};

    this.option('--version', 'output the version number', function () {
      console.log(this._version);
    });
  }

  usage (_usage) {
    this._usage = _usage;
    return this;
  }

  help () {
    return `\n  Usage: ${this._name} ${this._usage}\n`;
  }

  version (_version) {
    this._version = _version;
    return this;
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

    this._name = path.basename(_args[1]);
    let args = [];
    let opt = {};

    for (let i = 2; i < _args.length; i++) {
      const arg = _args[i];
      if (this._option.hasOwnProperty(arg) === false) {
        args.push(arg);
        continue;
      }

      const o = this._option[arg];
      if (opt.hasOwnProperty(o.name)) {
        throw new TypeError(`flag '${o.short}', '${o.long}' is repeated`);
      }

      /* * * Parameter * * */
      let param;
      if (o.param === null) {
        param = true;
      } else {

        /* * * Need Parameter * * */
        i += 1;  // next index

        if (i === _args.length) {
          throw new TypeError(`'${arg}' need the parameter`);
        }

        const nextArg = _args[i];
        if (this._option.hasOwnProperty(nextArg)) {
          throw new TypeError(`'${arg}' need the parameter`);
        }

        param = nextArg;
      }

      opt[o.name] = param;

      /* * * Action * * */
      if (typeof o.action === 'function') {
        o.action(param);
      }
    }

    return {
      name: this._name,
      args,
      opt
    };
  }
};
