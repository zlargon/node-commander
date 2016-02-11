'use strict';
const Flag = require('../src/Flag');
const expect = require('chai').expect;

describe('flag.isLong', function () {

  it('(empty)', function () {
    const input = '';
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('--', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('-f', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('-F', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('---', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('----', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('--foo', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.true;
  });

  it('a', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('aaaa', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('-0', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('-1', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('-2', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('--11', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('--123', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('--foo--', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('--foo-', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('--foo--bar', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('--foo-bar', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.true;
  });

  it('--foo-b', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.true;
  });

  it('--f', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.false;
  });

  it('--foo_bar', function () {
    const input = this.test.title;
    const output = Flag.isLong(input);
    expect(output).to.be.true;
  });
});
