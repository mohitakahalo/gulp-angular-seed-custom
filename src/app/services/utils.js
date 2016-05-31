(function() {
  'use strict';

  angular
    .module('services')
    .factory('utils', utils);

    /** @ngInject */
    function utils(appConstants) {

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      /**
        * @nodeList {array} should be an array of DOM nodes (from querySelectorAll or some other method)
        * @classes {string} should be comma separated for multiple classes ('class-1-to-remove', 'class-2-to-remove')
      **/
      function removeClassFromAllNodes(nodeList, classes) {
        if (!nodeList.length) {
          return;
        }
        Array.prototype.forEach.call(nodeList, function (node, index) {
          nodeList[index].classList.remove(classes);
        });
      }

      function getRelativeTime(isoTime) {
        if (!isoTime) {
          return;
        }
        return moment(isoTime).fromNow();
      }

      function getFormattedDate(isoFormat) {
        if (!isoFormat) {
          return;
        }
        return moment(isoFormat).format('DD MMMM YYYY');
      }

      function quickCopy(object) {
        if (!object || !angular.isObject(object)) {
          return;
        }
        return JSON.parse(JSON.stringify(object));
      }

      function parseDebtType(debtTypeArray) {
        if(!debtTypeArray || !debtTypeArray.length) {
          return '';
        }
        var toBeReturned = '';
        for(var i = 0; i < debtTypeArray.length; i++) {
          toBeReturned += appConstants.DEBT_NUMBER_TO_TYPE_MAP[debtTypeArray[i]];
          toBeReturned += i + 1 === debtTypeArray.length ? '' : ', ';
        }
        return toBeReturned;
      }

      return {
        getRandomInt: getRandomInt,
        removeClassFromAllNodes: removeClassFromAllNodes,
        getRelativeTime: getRelativeTime,
        getFormattedDate: getFormattedDate,
        quickCopy: quickCopy,
        parseDebtType: parseDebtType
      };
    }
})();
