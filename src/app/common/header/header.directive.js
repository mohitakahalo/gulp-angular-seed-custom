(function() {
  'use strict';

  angular
  .module('common')
  .directive('appHeader', appHeader);

  /** @ngInject */
  function appHeader(navigationService) {
    return {
      restrict: 'AE',
      templateUrl: 'app/common/header/header.tpl.html',
      scope: {},
      controller: ['$scope', function() {
        var vm = this;

        vm.logoutUser = function() {
          navigationService.logOut();
        };

        return vm;
      }],
      controllerAs: 'headerCtrl'
    }
  }

})();