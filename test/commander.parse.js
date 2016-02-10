'use strict';
const commander = require('../src/Commander');
const expect = require('chai').expect;

describe('commander.parse', function () {

  it('(empty)', function () {
    const program = new commander();

    const input = [];
    expect(
      program.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('123 (number)', function () {
    const program = new commander();

    const input = 123;
    expect(
      program.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('"node test" (string)', function () {
    const program = new commander();

    const input = 'node test';
    expect(
      program.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('node', function () {
    const program = new commander();

    const input = ['node'];
    expect(
      program.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('node ./cli', function () {
    const program = new commander();

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    /*
     * {
     *   name: 'cli',
     *   args: []
     * }
     */
    expect(output.name).to.equal('cli');
    expect(output.args.length).to.equal(0);
  });

  it('node ./cli foo', function () {
    const program = new commander();

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    /*
     * {
     *   name: 'cli',
     *   args: ['foo']
     * }
     */
    expect(output.name).to.equal('cli');
    expect(output.args).to.deep.equal(['foo']);
  });

  it('node ./cli foo bar', function () {
    const program = new commander();

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    /*
     * {
     *   name: 'cli',
     *   args: ['foo', 'bar']
     * }
     */
    expect(output.name).to.equal('cli');
    expect(output.args).to.deep.equal(['foo', 'bar']);
  });
});
