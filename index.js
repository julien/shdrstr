'use strict';

var assert = require('assert');
var fs = require('fs');
var transform = require('./transform');
var util = require('util');

module.exports = function (options) {
  options = util._extend({src: '*.glsl', out: './'}, options);
  return transform(options);
};
