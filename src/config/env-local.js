(function() {
  'use strict';

  angular
    .module('env', [])
    .factory('env', env);

  function env() {
    return {
      environment: 'local',
      platformHost: 'http://localhost',
      platformPort: 8000
    }
  }

})();