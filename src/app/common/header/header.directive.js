angular
  .module('common')
  .directive('appHeader', appHeader);

/** @ngInject */
function appHeader() {
  return {
    restrict: 'AE',
    templateUrl: 'app/common/header/header.tpl.html',
    scope: {
      openModal: '&'
    }
  };
}