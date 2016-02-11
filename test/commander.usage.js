'use strict';
const commander = require('../src/Commander');
const expect = require('chai').expect;

describe('commander.usage', function () {

  it('  Usage: cli <val>', function () {
    const usage = '<val>';
    const program = new commander()
      .usage(usage)
      .option('-f, --foo', 'foo');

    program.parse(['node', 'cli']);   // here input cli name

    const secondLine = program.help().split('\n')[1];
    expect(secondLine).to.equal(this.test.title);
  });

});
