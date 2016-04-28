/*
  app.js : main file which starts the application 
  author : @mohit-kuliza
*/
(function() {
  'use strict';

  angular
    .module('tribeFrontend', [
      'env', // added by our initial gulp command
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'services',
      'common',
      'landingPage',
      'profiles'
    ])
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $urlRouterProvider.otherwise('/');
  }

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();