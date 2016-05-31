/*
  auth.js : main file which handles all the request auth functionalities 
  author : @mohit-kuliza
*/
(function() {
  'use strict';
  
  angular
    .module('services')
    .factory('auth', auth);

  /** @ngInject */
  function auth() {
    var userObj = null,
        entryURL = null;

    // Get authenticated user object
    function getUserObj() {
      // first check if user object present in memory.
      if (angular.isObject(userObj)) {
        return userObj;
      }
      // next see if we can get it from session storage.
      if (window.sessionStorage.userObj) {
        userObj = JSON.parse(window.sessionStorage.userObj);
      }
      return userObj;
    }

    function _generateUserObj(dataObj) {
      return {
        access_token: dataObj.access_token, // headers('AUTHORIZATION'),
        user_id: dataObj.user.user_id,
        first_name: dataObj.user.user_first_name,
        last_name: dataObj.user.user_last_name,
        role: dataObj.user.role,
        company_id: dataObj.user.company_id,
        user_image: dataObj.user.user_image
      };
    }

    function setUserObj(loginResponse) {
      if (loginResponse) {
        userObj = _generateUserObj(loginResponse);
        // persist in session storage so this is available for page refreshes.
        window.sessionStorage.userObj = JSON.stringify(userObj);
      }
    }
    
    function isAuthenticated() {
      return !!getUserObj();
    }

    function deleteSession() {
      var sessionStorage = window.sessionStorage;

      // clear whatever is in userObj and sessionStorage userObj
      sessionStorage.userObj = '';
      userObj = null;
    }

    /**
     * Save URL user requested before needing to authenticate.
     * @param {string} url user requested while not authenticated.
     */
    function setEntryURL(url) {
      entryURL = url;
    }

    /**
     * Get stored entry url for redirection.
     * @return {String} entryURL stored before authentication
     */
    function getEntryURL() {
      return entryURL;
    }

    return {
      getUserObj: getUserObj,
      setUserObj: setUserObj,
      isAuthenticated: isAuthenticated,
      deleteSession: deleteSession,
      setEntryURL: setEntryURL,
      getEntryURL: getEntryURL
    };
  }
})();