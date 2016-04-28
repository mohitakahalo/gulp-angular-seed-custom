(function() {
  'use strict';

  angular
    .module('landingPage', ['services', 'common'])
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('landing_page', {
        url: '/',
        templateUrl: 'app/landingPage/landingPage.tpl.html',
        controller: 'landingPageController',
        controllerAs: 'landingPage'
      });
  }

})();