'use strict';
const Flag = require('../src/Flag');
const expect = require('chai').expect;

describe('flag.parse', function () {

  it('(empty)', function () {
    const input = '';
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('123 (number)', function () {
    const input = 123;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('- f, --foo', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('-f , --foo\\n (trim)', function () {
    const input = '-f , --foo\n';
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'foo',
      short: '-f',
      long: '--foo',
      boolType: true
    });
  });

  it('-f ,\\n --foo\\n (trim)', function () {
    const input = '-f ,\n --foo\n';
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'foo',
      short: '-f',
      long: '--foo',
      boolType: true
    });
  });

  it('-f ,\\n --\\nfoo\\n (trim)', function () {
    const input = '-f ,\n --\nfoo\n';
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('-f ,\\n --f\\too\\n (trim)', function () {
    const input = '-f ,\n --f\too\n';
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('f, --Foo', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('-f,foo', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('-f', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'f',
      short: '-f',
      long: null,
      boolType: true
    });
  });

  it('--', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: '-',
      short: '--',
      long: null,
      boolType: true
    });
  });

  it('--foo', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'foo',
      short: null,
      long: '--foo',
      boolType: true
    });
  });

  it('--Foo', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('    -f   ,    --foo    ', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'foo',
      short: '-f',
      long: '--foo',
      boolType: true
    });
  });

  it('-f, --foo, -b, --bar', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('--Foo, --Foo, --Foo (repeated)', function () {
    const input = '--Foo, --Foo, --Foo'
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('-f, --foo <bar>', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'foo',
      short: '-f',
      long: '--foo',
      boolType: false
    });
  });

  it('-f <bar>', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'f',
      short: '-f',
      long: null,
      boolType: false
    });
  });

  it('--foo <bar>', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'foo',
      short: null,
      long: '--foo',
      boolType: false
    });
  });

  it('--foo    <b>', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'foo',
      short: null,
      long: '--foo',
      boolType: false
    });
  });

  it('--foo <>', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('--foo <<>>', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('--foo <_ _>', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('--foo < BAR >', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'foo',
      short: null,
      long: '--foo',
      boolType: false
    });
  });

  it('--foo <   BAR   >', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'foo',
      short: null,
      long: '--foo',
      boolType: false
    });
  });

  it('--Foo-bar <var>', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('-f, --foo-bar <var>', function () {
    const input = this.test.title;
    const output = Flag.parse(input);

    expect(output).deep.equal({
      name: 'fooBar',
      short: '-f',
      long: '--foo-bar',
      boolType: false
    });
  });

  it('--foo--bar <var>', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('--f', function () {
    const input = this.test.title;
    expect(
      Flag.parse.bind(null, input)
    ).to.throw(TypeError);
  });
});
