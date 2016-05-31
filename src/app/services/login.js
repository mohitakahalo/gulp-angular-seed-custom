/*
  login.js : service to open the login state modal
  author : @mohit-kuliza
*/
(function() {
  'use strict';
  
  angular
    .module('services')
    .factory('loginService', loginService);

  /** @ngInject */
  function loginService($uibModal, auth, $state) {

    function openLoginModal(event) {
      // open the login modal window
      $uibModal.open({
        templateUrl: 'app/common/login/loginModal.tpl.html',
        size: 'sm',
        controller: function($uibModalInstance, $scope, navigationService) {
          // authenticate the login data
          $scope.loginData = {};
          $scope.closeLoginModal = function() {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.goToSignUp = function() {
            $scope.closeLoginModal();
            $state.go('register');
          };

          $scope.submitLoginForm = function() {
            $scope.loginData.identity = 'app'; // hardcoding for now
            
            navigationService.logIn($scope.loginData).then(function(response) {
              $uibModalInstance.close(response);
            }, function(response) {
              alert(response);
            });
          };
        }
      }).result.then(function(loginResponse) {
        // set User Obj in memory and sessionStorage from login response
        auth.setUserObj(loginResponse);
        // on modal close
        if (auth.getEntryURL()) {
          window.location = auth.getEntryURL();
        } else {
          $state.go('dashboard.home'); // add the state to go after login
        }
      }, function() {
        // on modal dismiss
      });

      // Prevent the transition to the dummy state, stay where you are
      event.preventDefault();
    }

    return {
      openLoginModal: openLoginModal
    };
  }
})();