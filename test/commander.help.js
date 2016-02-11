'use strict';
const expect = require('chai').expect;
const rewire = require('rewire');
const sinon = require('sinon');

const commander = rewire('../src/Commander');

describe('commander.help', function () {

  beforeEach(function () {
    this.console = {
      log: sinon.spy()
    };

    this.process = {
      exit: sinon.spy(),
      argv: ['node', './cli.js']
    };

    commander.__set__('console', this.console);
    commander.__set__('process', this.process);
  });

  it('commander.help', function () {
    const program = new commander();
    program
      .usage('<test>')
      .version('0.0.0')
      .option('-f, --foo', 'foo')
      .option('   -b   ,   --bar   <  var >', 'bar')
      .parse(['node', 'cli']);  // give file name here

    const output = program.help();
    expect(output).to.equal([
      ''
      ,'  Usage: cli <test>'
      ,''
      ,'  Options:'
      ,''
      ,'    -h, --help       output usage information'
      ,'    --version        output the version number'
      ,'    -f, --foo        foo'
      ,'    -b, --bar <var>  bar'
      ,''
    ].join('\n'));
  });

  it('node ./cli -h', function () {
    const program = new commander();
    program
      .usage('<test>')
      .version('0.0.0')
      .option('-f, --foo', 'foo')
      .option('-b, --bar <var>', 'bar')
      .parse(this.test.title.split(' '));

    expect(
      this.console.log.calledWith([
        ''
        ,'  Usage: cli <test>'
        ,''
        ,'  Options:'
        ,''
        ,'    -h, --help       output usage information'
        ,'    --version        output the version number'
        ,'    -f, --foo        foo'
        ,'    -b, --bar <var>  bar'
        ,''
      ].join('\n'))
    ).to.be.true;

    expect(this.process.exit.calledOnce).to.be.true;
  });

  it('node ./cli -h (re-order the version)', function () {
    const program = new commander();
    program
      .usage('<test>')
      .option('-f, --foo', 'foo')
      .option('-b, --bar <var>', 'bar')
      .version('0.0.0')
      .parse('node ./cli -h'.split(' '));

    expect(
      this.console.log.calledWith([
        ''
        ,'  Usage: cli <test>'
        ,''
        ,'  Options:'
        ,''
        ,'    -h, --help       output usage information'
        ,'    --version        output the version number'
        ,'    -f, --foo        foo'
        ,'    -b, --bar <var>  bar'
        ,''
      ].join('\n'))
    ).to.be.true;

    expect(this.process.exit.calledOnce).to.be.true;
  });
});
