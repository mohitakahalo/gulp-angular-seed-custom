/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var conf = require('./gulp/conf');
var constants = conf.constants;

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('set-dev-env', function() {
  return process.env.NODE_ENV = constants.ENV_DEV;
});

gulp.task('set-staging-env', function() {
  return process.env.NODE_ENV = constants.ENV_STAGING;
});

gulp.task('set-prod-env', function() {
  return process.env.NODE_ENV = constants.ENV_PROD;
});

gulp.task('default', ['clean', 'set-dev-env'], function () {
  gulp.start('serve');
});

gulp.task('dev', ['clean', 'set-dev-env'], function () {
  gulp.start('serve:dev');
});

gulp.task('staging', ['clean', 'set-staging-env'], function () {
  gulp.start('serve:staging');
});

gulp.task('prod', ['clean', 'set-prod-env'], function () {
  gulp.start('serve:prod');
});
