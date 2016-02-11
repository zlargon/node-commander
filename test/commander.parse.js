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

    expect(output).to.deep.equal({
      name: 'cli',
      args: [],
      opt: {}
    });
  });

  it('node ./cli foo', function () {
    const program = new commander();

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: ['foo'],
      opt: {}
    });
  });

  it('node ./cli foo bar', function () {
    const program = new commander();

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: ['foo', 'bar'],
      opt: {}
    });
  });

  it('node ./cli -f', function () {
    const program = new commander();
    program.option('-f', 'foo');

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: [],
      opt: {
        f: true
      }
    });
  });

  it('node ./cli -- -f -b', function () {
    const program = new commander();
    program
      .option('--', '---')
      .option('-f', 'foo')
      .option('-b', 'bar');

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: [],
      opt: {
        '-': true,
        f: true,
        b: true
      }
    });
  });

  it('node ./cli -- --cool', function () {
    const program = new commander();
    program.option('--, --cool', 'cool!');

    const input = this.test.title.split(' ');
    expect(
      program.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('node ./cli -n -2', function () {
    const program = new commander();
    program
      .option('-n, --number <val>', 'number');

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: [],
      opt: {
        'number': '-2'
      }
    });
  });

  it('node ./cli --add-milk 2', function () {
    const program = new commander();
    program
      .option('--add-milk <num>', 'milk');

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: [],
      opt: {
        'addMilk': '2'
      }
    });
  });

  it('node ./cli -f test1 --bar test2', function () {
    const program = new commander();
    program
      .option('-f, --foo <val>', 'foo')
      .option('-b, --bar <val>', 'bar');

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: [],
      opt: {
        'foo': 'test1',
        'bar': 'test2'
      }
    });
  });

  it('node ./cli -f --bar test2', function () {
    const program = new commander();
    program
      .option('-f, --foo <val>', 'foo')
      .option('-b, --bar <val>', 'bar');

    const input = this.test.title.split(' ');
    expect(
      program.parse.bind(null, input)
    ).to.throw(TypeError);
  });

  it('node ./cli --add 10 --foo --bar', function () {
    let num = 100;
    const program = new commander();
    program
      .option('--add <number>', 'add number', function (n) {
        num += parseInt(n, 10);
      });

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: ['--foo', '--bar'],
      opt: {
        'add': '10'
      }
    });
    expect(num).to.equal(110);
  });

  it('node ./cli --add 10 200', function () {
    let num = 100;
    const addNumber = n => {
      num += parseInt(n, 10);
    };

    const program = new commander();
    program
      .option('--add <number>', 'add number', addNumber);

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: ['200'],
      opt: {
        'add': '10'
      }
    });
    expect(num).to.equal(110);
  });

  it('node ./cli --add_number 10 200', function () {
    let num = 100;
    const addNumber = n => {
      num += parseInt(n, 10);
    };

    const program = new commander();
    program
      .option('--add_number <number>', 'add number', addNumber);

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: ['200'],
      opt: {
        'add_number': '10'
      }
    });
    expect(num).to.equal(110);
  });

  it('node ./cli -f test (function scope)', function () {
    const program = new commander();
    program
      .option('-f, --foo <val>', 'foo', function (val) {
        expect(this).to.equal(program);
      });

    const input = this.test.title.split(' ');
    const output = program.parse(input);

    expect(output).to.deep.equal({
      name: 'cli',
      args: ['(function', 'scope)'],
      opt: {
        'foo': 'test'
      }
    });
  });
});
