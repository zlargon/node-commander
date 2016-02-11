'use strict';
module.exports = {
  isShort (flag) {
    return /^-[-a-zA-Z]$/g.test(flag);
  },

  isLong (flag) {
    return flag.length >= 4 && /^-(-[a-z_]+)+$/g.test(flag);
  },

  parse (_flags) {
    if (typeof _flags !== 'string' || _flags.length < 2) {
      throw new TypeError('flags should be a string');
    }

    /* flag format:
     *
     * --
     * -f
     * --foo
     * --no-foo
     * -f,--foo
     * -f,--foo<bar>
     */

    // 1. check parameters
    let flags = _flags.replace(/\s*<\s*\w+\s*>\s*$/g, '');

    // 2. parse options
    let option = {
      name: null,
      short: null,
      long: null,
      boolType: flags === _flags
    };

    // flag = ['-f', '--foo']
    const self = this;
    flags.split(',')
      .map(s => s.trim())
      .forEach(function (opt) {
        // -f, -F, --
        if (self.isShort(opt)) {
          if (option.short !== null) {
            throw new TypeError(`cannot have another short flags '${_flags}'`);
          }

          option.short = opt;
          return;
        }

        // --foo, --no-foo, --hello-world
        if (self.isLong(opt)) {
          if (option.long !== null) {
            throw new TypeError(`cannot have another long flags '${_flags}'`);
          }

          option.long = opt;
          return;
        }

        throw new TypeError(`invalid option flags '${_flags}'`);
      });

    // 3. get option name
    if (option.long !== null) {
      option.long.slice(2).split('-').forEach(function (str) {
        if (option.name === null) {
          option.name = str;
        } else {
          option.name += str.charAt(0).toUpperCase() + str.slice(1);
        }
      });
    }

    if (option.name === null) {
      option.name = option.short.charAt(1);
    }

    return option;
  }
};
