angular
  .module('common')
  .directive('appFooter', appFooter);

/** @ngInject */
function appFooter() {
  return {
    restrict: 'AE',
    templateUrl: 'app/common/footer/footer.tpl.html',
    scope: {}
  };
}