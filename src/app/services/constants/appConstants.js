(function() {
  
  angular
    .module('services')
    .factory('appConstants', appConstants); 

  /** @ngInject */
  function appConstants() {
    return  {
      BASE_URL: '/api/mock'
    };
  }
})();