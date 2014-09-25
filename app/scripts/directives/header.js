'use strict';

angular.module('openeyesApp')
  .controller('HeaderCtrl', ['$scope', '$attrs', '$location', function($scope, $attrs, $location){
    $scope.isActive = function (location) {
      return location === $location.path();
    };
  }])
  .directive('oeHeader', [function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'views/directives/header.html',
      controller: 'HeaderCtrl'
    };
  }]);
