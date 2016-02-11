'use strict';
const Flag = require('../src/Flag');
const expect = require('chai').expect;

describe('flag.isShort', function () {

  it('(empty)', function () {
    const input = '';
    const output = Flag.isShort(input);
    expect(output).to.be.false;
  });


  it('-f', function () {
    const input = this.test.title;
    const output = Flag.isShort(input);
    expect(output).to.be.true;
  });

  it('--', function () {
    const input = this.test.title;
    const output = Flag.isShort(input);
    expect(output).to.be.true;
  });

  it('-F', function () {
    const input = this.test.title;
    const output = Flag.isShort(input);
    expect(output).to.be.true;
  });

  it('---', function () {
    const input = this.test.title;
    const output = Flag.isShort(input);
    expect(output).to.be.false;
  });

  it('aa', function () {
    const input = this.test.title;
    const output = Flag.isShort(input);
    expect(output).to.be.false;
  });

  it('a', function () {
    const input = this.test.title;
    const output = Flag.isShort(input);
    expect(output).to.be.false;
  });

  it('-1', function () {
    const input = this.test.title;
    const output = Flag.isShort(input);
    expect(output).to.be.false;
  });

  it('-2', function () {
    const input = this.test.title;
    const output = Flag.isShort(input);
    expect(output).to.be.false;
  });
});
