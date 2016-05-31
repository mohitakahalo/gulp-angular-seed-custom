angular
  .module('common')
  .directive('tribeLoader', tribeLoader)

/** @ngInject */
function tribeLoader() {
  return {
    restrict: 'AE',
    templateUrl: 'app/common/loader/loader.tpl.html',
    link: function (scope, element) {
      scope.$on("loader_show", function () {
        return element.show();
      });
      return scope.$on("loader_hide", function () {
        return element.hide();
      });
    }
  };
}