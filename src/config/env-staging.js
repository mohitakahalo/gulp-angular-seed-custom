(function() {
  'use strict';

  angular
    .module('env', [])
    .factory('env', env);

  function env() {
    return {
      environment: 'staging',
      platformHost: 'http://23.20.141.47',
      platformPort: 80
    }
  }

})();