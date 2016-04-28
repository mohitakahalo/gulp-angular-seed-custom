(function() {
  'use strict';

  angular
    .module('env', [])
    .factory('env', env);

  function env() {
    return {
      environment: 'test',
      platformHost: 'http://007.testisbest.webapp',
      platformPort: 8000
    }
  }

})();