var dumbLoader = require('./index');
var should = require('should');
var sinon = require('sinon');
var q = require('q');

describe('Dumb Loader', function() {

  it('should throw an error if no load function is supplied', function() {
    (function() {
      dumbLoader();
    }).should.throw('dumb loader requires a load function');
  });

  it('should call my custom load function', function(done) {
    var load = sinon.sandbox.stub().returns(q.when());
    var loader = dumbLoader(load);
    loader.load([])
      .then(function() {
        load.callCount.should.equal(1);
        done();
      })
      .then(null, done);
  });

  it('should still return a promise when we pass in the async flag as false', function(done) {
    var load = sinon.sandbox.stub();
    var loader = dumbLoader(load, false);
    loader.load([])
      .then(function() {
        load.callCount.should.equal(1);
        done();
      })
      .then(null, done);
  });
});
