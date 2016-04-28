(function() {
  'use strict';

  angular
    .module('env', [])
    .factory('env', env);

  function env() {
    return {
      environment: 'prod',
      platformHost: 'http://www.dodgetheprod.webapp',
      platformPort: 8000
    }
  }

})();