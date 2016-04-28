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
gulp.task('setLocalEnv', function() {
    return process.env.NODE_ENV = constants.ENV_LOCAL;
});

gulp.task('setProdEnv', function() {
    return process.env.NODE_ENV = constants.ENV_PROD;
});

gulp.task('setTestEnv', function() {
    return process.env.NODE_ENV = constants.ENV_TEST;
});

gulp.task('default', ['clean', 'setLocalEnv'], function () {
  gulp.start('serve');
});

gulp.task('prodEnv', ['clean', 'setProdEnv'], function () {
  gulp.start('serve:dist');
});

gulp.task('testEnv', ['clean', 'setTestEnv'], function () {
  gulp.start('serve:dist');
});
