/*
** Http service to make ajax calls and get or post data 
** author: @ishmeet
*/
(function(){
  'use strict';
  
  angular
    .module('services')
    .factory('httpService', httpService);

  /** @ngInject */
  function httpService($q, $http) {
    /* will make a get call with options
    * options will have =>
    * {
    * url=> url to point to
    *   params => parameters for the query
    *   failReturn => data to return if the query fails, will return api error as default
    *   ** can add more, later
    * }
    */
    function get(options) {
      var deferred = $q.defer();
      $http.get(options.url, {params: options.params}).then(function(responseObj) {
        deferred.resolve(responseObj.data.response);
      }, function(error) {
        deferred.reject(options.failReturn || error);
      });

      return deferred.promise;
    }

    /* 
    * params in options for put function will be the data payload
    */
    function put(options) {
      var deferred = $q.defer();
      $http.put(options.url, options.params).then(function(responseObj) {
        deferred.resolve(responseObj.data.response);
      }, function(error) {
        deferred.reject(options.failReturn || error);
      });

      return deferred.promise;
    }

    /* 
    * params in options for post function will be the data payload
    */
    function post(options) {
      var deferred = $q.defer();
      $http.post(options.url, options.params).then(function(responseObj) {
        deferred.resolve(responseObj.data.response);
      }, function(error) {
        deferred.reject(options.failReturn || error);
      });

      return deferred.promise;
    }

    /* 
    * params in options for post function will be the data payload
    */
    function deleteRequest(options) {
      var deferred = $q.defer();
      $http.delete(options.url, {data: options.params}).then(function(responseObj) {
        deferred.resolve(responseObj.data.response);
      }, function(error) {
        deferred.reject(options.failReturn || error);
      });

      return deferred.promise;
    }

    return {
      get: get,
      put: put,
      post: post,
      deleteRequest: deleteRequest
    };
  }
})();