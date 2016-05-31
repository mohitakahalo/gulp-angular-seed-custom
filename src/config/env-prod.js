(function() {
  'use strict';

  angular
    .module('env', [])
    .factory('env', env);

  function env() {
    return {
      environment: 'prod',
      platformHost: 'http://www.tribe.com',
      platformPort: 80
    }
  }

})();