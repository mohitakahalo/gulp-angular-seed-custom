'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var connect = require('gulp-connect');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles-reload', ['styles'], function() {
  return buildStyles()
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  return buildStyles();
});

var buildStyles = function() {
  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/sass/**/*.scss'),
    path.join(conf.paths.src, '/sass/libs/**/*.scss'),
    path.join('!' + conf.paths.src, '/sass/index.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/sass/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src([
      path.join(conf.paths.src, '/sass/index.scss')
    ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.rubySass(sassOptions)).on('error', conf.errorHandler('RubySass'))
    .pipe(cssFilter)
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};
