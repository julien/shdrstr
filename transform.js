'use strict';

var Transform = require('stream').Transform;
var util = require('util');
var vfs = require('vinyl-fs');

function Stream(options) {
  options = util._extend({objectMode: true}, options);
  Transform.call(this, options);
}
util.inherits(Stream, Transform);

Stream.prototype._transform = function (file, enc, cb) {
  var content = file.contents.toString().replace(/(?:\r\n|\r|\n+|\t+|\s{2})/g, '');
  var newContent =  'module.exports = "' + content.trim() + '";';

  var newFile = file.clone({content: false});
  newFile.basename = file.basename + '.js';
  newFile.contents = new Buffer(newContent);
  this.push(newFile);

  cb();
};

Stream.prototype._flush = function (cb) {
  cb();
};

module.exports = function (options) {
  options = util._extend({src: '*.glsl', out: './'}, options);

  return vfs.src(options.src)
    .pipe(new Stream({}))
    .pipe(vfs.dest(options.out));
};
