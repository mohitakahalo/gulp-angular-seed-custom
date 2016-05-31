/*
** Navigation service used to navigate between the app
** author: @mohit-kuliza
*/
(function(){
  'use strict';

  angular
  .module('services')
  .factory('navigationService', navigationService);

  /** @ngInject */
  function navigationService($q, $state, auth, $window, $log, accountApiService) {

    function logIn(params) {
      var deferred = $q.defer();

      // login call to server
      accountApiService.login(params)
        .then(function(response) {
          deferred.resolve(response);
        }, function(err) {
          if (err.status === 401) {
            deferred.reject('Incorrect login, please try again.');
          } else {
            deferred.reject('Something went wrong with your login, please try again.');
          }
        });

      return deferred.promise;
    }

    function logOut() {
      accountApiService.logout()
        .then(function() {
          _resetAppState();
        }, function(err) {
          $log.error(err);
          _resetAppState();
        });

      function _resetAppState() {
        // delete the current session
        auth.deleteSession();
        // Set the entry URL to null, so that once the user logs in, app takes the user to the default view instead of current URL
        auth.setEntryURL(null);
        // go to the default state
        $state.go('landing_page.home', {});
      }
    }

    return {
      logIn: logIn,
      logOut: logOut
    };
  }
})();