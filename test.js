'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var t = require('tap');

var task = require('./index');

t.test('should generate string', function (t) {

  var stream = task({
    src: path.join(__dirname, 'fixtures/*.glsl'),
    out: path.join(__dirname, 'tmp')
  });

  stream.on('error', function (err) {
    t.error(err);
    t.end();
  })

  stream.on('finish', function () {
    t.ok(fs.existsSync(path.join(__dirname, 'tmp/vert.glsl.js')));
    t.end();
  });

});

t.test('should be "requirable"', function (t) {
  var stream = task({
    src: path.join(__dirname, 'fixtures/*.glsl'),
    out: path.join(__dirname, 'tmp')
  });

  stream.on('error', function (err) {
    t.error(err);
    t.end();
  })

  stream.on('finish', function () {
    var vert = path.join(__dirname, 'tmp/vert.glsl.js');
    t.ok(fs.existsSync(vert));
    var s1 = require(vert);
    t.type(s1, 'string');

    var frag = path.join(__dirname, 'tmp/frag.glsl.js');
    t.ok(fs.existsSync(frag));

    var s2 = require(frag);
    t.type(s2, 'string');

    t.end();
  });

});
