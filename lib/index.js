'use strict';
var _ = require('lodash');
var q = require('q');

module.exports = function (loadFunc, async) {
  var _async;

  if (!_.isFunction(loadFunc)) {
    throw new Error('dumb loader requires a load function');
  }
  if (async === false) {
    _async = false;
  } else {
    _async = true;
  }

  var load = function (data) {
    if (_.isUndefined(data)) {
      throw new Error('loader - data undefined');
    }
    if (_async) {
      return loadFunc(data);
    } else {
      return q.when(loadFunc(data));
    }
  };

  return {
    load: load
  };
};
