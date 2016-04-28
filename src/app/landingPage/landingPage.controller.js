(function() {
  'use strict';

  angular
    .module('landingPage')
    .controller('landingPageController', landingPageController);

  /** @ngInject */
  function landingPageController($scope, $uibModal) {

    /* Login Modal Related functions
    1. openCredentialsModal => Opens Modal
    2. closeCredentailsModal => Closes Modal
    */
    $scope.openCredentialsModal = function() {
      $scope.loginData = {}; //Login form data
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/app/landingPage/landingModal.tpl.html',
        size:'sm',
        scope: $scope,
        controller: function($uibModalInstance, $scope){
          $scope.closeCredentailsModal = function () {
            $uibModalInstance.close();
          };
        }
      });

      modalInstance.result.then(function () {
        window.console.log('This is the form Data', $scope.loginData);
      });
    };

    /* Modal related functions end here */

  }

})();
