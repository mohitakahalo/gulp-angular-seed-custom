/*
  app.js: main file which starts the application, provides http and state change hooks, creates authInterceptor and basic routing
  author: @mohit-kuliza
*/
(function() {
  'use strict';

  angular
    .module('tribeFrontend', [
      'env', // added by our initial gulp command
      'ui.router',
      'ui.bootstrap',
      'slickCarousel',
      'toastr',
      'ngAnimate',
      'services',
      'common',
      'landingPage',
      'dashboard',
      'registerPage',
      'ngCkeditor'
    ])
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .config(httpConfig)
    .factory('authInterceptor', authInterceptor)
    .factory('loaderInterceptor', loaderInterceptor)
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, auth, $state, loginService, appConstants) {
    //$log.debug('runBlock end');
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      $log.info('toState-> ' + toState.name +  ', fromState-> ' + fromState.name);

      if (toState.name === 'login') {
        loginService.openLoginModal(event);
        return;
      }

      (function checkSessionTimeout() {
        var statesToExclude = appConstants.STATES_TO_EXCLUDE_FOR_AUTH;
        if (statesToExclude.indexOf(toState.name) !== -1) {
          return;
        } else if (auth.isAuthenticated()) {
          // Set the entry URL to null so that the current URL does not get carried
          auth.setEntryURL(null);
        } else {
          // not authenticated and not signing up
          // set the entry URL so that we can restore after successful login.
          event.preventDefault();
          auth.setEntryURL(window.location.pathname + window.location.search);
          $state.go('landing_page.home', {'login': true});
        }
      })();
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
      $state.previous = fromState;
      window.scrollTo(0, 0);
    });
  }

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    // defining dummy login state here as its common in all the modules
    $stateProvider
      .state('login', {
        url: '/login'
      });

    $urlRouterProvider.otherwise('/');
  }

  /** @ngInject */
  function config($logProvider, toastrConfig, $compileProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Disable debug info for increasing performance
    $compileProvider.debugInfoEnabled(false);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

  function loaderInterceptor($q, $rootScope) {
    var numLoadings = 0;

    return {
      request: function (config) {
        if (config.url.indexOf('/search/') > -1) {
          return config || $q.when(config);
        }
        numLoadings++;
        // Show loader
        $rootScope.$broadcast("loader_show");
        return config || $q.when(config);
      },
      response: function (response) {
        if (response.config.url.indexOf('/search/') > -1) {
          return response || $q.when(response);
        }
        if ((--numLoadings) === 0) {
          // Hide loader
          $rootScope.$broadcast("loader_hide");
        }
        return response || $q.when(response);
      },
      responseError: function (response) {
        if (response.config.url.indexOf('/search/') > -1) {
          return $q.reject(response);
        }
        if (!(--numLoadings)) {
          // Hide loader
          $rootScope.$broadcast("loader_hide");
        }
        return $q.reject(response);
      }
    };
  }

  /** @ngInject */
  function authInterceptor($q, $location, $injector) {
    // Intercept all http calls and if any returns a 401 session timeout, redirect user to login screen.
    return {
      'request': function(config) {
        var url = config.url,
            platformHost = $injector.get('env').platformHost,
            auth = $injector.get('auth');
        // Send access token for server CORS calls
        if ( url.substr(0, platformHost.length) === platformHost && auth.isAuthenticated() ) {
          config.headers['Authorization'] = 'Bearer ' + auth.getUserObj().access_token;
        }

        return config;
      },
      'responseError': function(response) {
        if (response.status === 401) {
          // set the entry URL so that we can restore after successful login.
          var auth = $injector.get('auth');
          auth.setEntryURL(window.location.pathname + window.location.search);

          var errorMsg = 'Your session timed out. Please login again';
          var $state = $injector.get('$state');
          if ($state.current.name !== 'landing_page' || $state.current.name !=='register') {
            var navigationService = $injector.get('navigationService');
            navigationService.logOut(errorMsg);
          }
        }
        return $q.reject(response);
      }
    };
  }

  /** @ngInject */
  function httpConfig($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';

    //Remove the header used to identify ajax call that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    //check if the request contains all the neccesary params
    $httpProvider.interceptors.push('authInterceptor');

    //Create the loading spinner interceptor
    $httpProvider.interceptors.push('loaderInterceptor');
  }

})();