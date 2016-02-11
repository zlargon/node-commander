'use strict';
const Commander = require('../src/Commander');
const expect = require('chai').expect;

describe('commander.option', function () {

  it('add foo', function () {
    const program = new Commander();
    program.option('-f, --foo', 'foo!!');

    const foo = {
      name: 'foo',
      short: '-f',
      long: '--foo',
      param: null,
      desc: 'foo!!',
      action: null
    };

    expect(program._option['-f']).to.deep.equal(foo);
    expect(program._option['--foo']).to.deep.equal(foo);
  });

  it('add fooBar with param', function () {
    const program = new Commander();
    program.option('-f, --foo-bar <var>', 'foo!! bar!!');

    const fooBar = {
      name: 'fooBar',
      short: '-f',
      long: '--foo-bar',
      param: '<var>',
      desc: 'foo!! bar!!',
      action: null
    };

    expect(program._option['-f']).to.deep.equal(fooBar);
    expect(program._option['--foo-bar']).to.deep.equal(fooBar);
  });

  it('add foo, bar', function () {
    const program = new Commander();
    program.option('   -f   , --foo   ', 'foo!!');
    expect(
      program.option.bind(this, '-b, --BAR', 'bar!!')
    ).to.throw(TypeError);
  });

  it('add foo, bar', function () {
    const program = new Commander();
    program.option('   -f   , --foo   ', 'foo!!');
    program.option('-b, --bar <var>', 'bar!!');

    const foo = {
      name: 'foo',
      short: '-f',
      long: '--foo',
      param: null,
      desc: 'foo!!',
      action: null
    };

    const bar = {
      name: 'bar',
      short: '-b',
      long: '--bar',
      param: '<var>',
      desc: 'bar!!',
      action: null
    };

    expect(program._option['-f']).to.deep.equal(foo);
    expect(program._option['--foo']).to.deep.equal(foo);
    expect(program._option['-b']).to.deep.equal(bar);
    expect(program._option['--bar']).to.deep.equal(bar);
  });

  it('add foo (repeated)', function () {
    const program = new Commander();
    expect(
      program.option.bind(null, '--foo, --foo', 'foo!!')
    ).to.throw(TypeError);
  });

  it('add bar (repeated)', function () {
    const program = new Commander();
    program.option('-b, --bar', 'bar!!');

    expect(
      program.option.bind(null, '-b, --bar', 'bar!!')
    ).to.throw(TypeError);
  });
});
