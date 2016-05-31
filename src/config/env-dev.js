(function() {
  'use strict';

  angular
    .module('env', [])
    .factory('env', env);

  function env() {
    return {
      environment: 'dev',
      platformHost: 'http://23.20.230.178',
      platformPort: 80
    }
  }

})();