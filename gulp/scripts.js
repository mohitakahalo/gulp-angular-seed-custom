'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', function() {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', ['concat'], function() {
  return buildScripts();
});

gulp.task('concat' , function() {
  return concatScripts();
});

function buildScripts() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.size())
};

function concatScripts() {
  return gulp.src([
      path.join(conf.paths.src, 'app/**/*.js'),
      path.join(conf.paths.src, 'config/**/env-' + process.env.NODE_ENV + '.js'),
      path.join('!' + conf.paths.src, '/libs/**/*.js')
    ])
    .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'))
    .pipe($.concat('app-build.js'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};
