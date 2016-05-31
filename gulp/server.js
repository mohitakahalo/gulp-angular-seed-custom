'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var connect = require('gulp-connect');

gulp.task('serve', ['watch'], function() {
  connect.server({
    root: [path.join(conf.paths.tmp, '/serve'), conf.paths.src],
    port: 8001,
    livereload: true,
    fallback: conf.paths.tmp + '/serve/index.html',
    middleware: function(connect) {
      return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});

gulp.task('serve:dev', ['build'], function() {
  connect.server({
    root: conf.paths.dist,
    host: conf.hosts.dev,
    port: 8001,
    debug: false,
    livereload: false,
    fallback: conf.paths.dist + '/index.html',
    middleware: function(connect) {
      return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});

gulp.task('serve:staging', ['build'], function() {
  connect.server({
    root: conf.paths.dist,
    host: conf.hosts.staging,
    port: 8001,
    debug: false,
    livereload: false,
    fallback: conf.paths.dist + '/index.html',
    middleware: function(connect) {
      return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});

gulp.task('serve:prod', ['build'], function() {
  connect.server({
    root: conf.paths.dist,
    host: conf.hosts.prod,
    port: 8001,
    debug: false,
    livereload: false,
    fallback: conf.paths.dist + '/index.html',
    middleware: function(connect) {
      return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});
