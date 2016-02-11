'use strict';
const expect = require('chai').expect;
const rewire = require('rewire');
const sinon = require('sinon');

const commander = rewire('../src/Commander');

describe('commander.version', function () {

  beforeEach(function () {
    this.console = {
      log: sinon.spy()
    };

    commander.__set__("console", this.console);
  });

  it('no version', function () {
    const program = new commander();
    const input = 'node ./cli --version';

    const output = program.parse(input.split(' '));
    expect(output).to.deep.equal({
      name: 'cli',
      args: [],
      opt: {
        version: true
      }
    });

    expect(this.console.log.calledWith('')).to.be.true;
  });

  it('version 0.0.0', function () {
    const program = new commander();
    program.version('0.0.0');

    const input = 'node ./cli --version';
    const output = program.parse(input.split(' '));
    expect(output).to.deep.equal({
      name: 'cli',
      args: [],
      opt: {
        version: true
      }
    });

    expect(this.console.log.calledWith('0.0.0')).to.be.true;
  });
});
