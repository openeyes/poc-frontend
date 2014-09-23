'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('NavCtrl', ['$scope', '$location', 'Event', function ($scope, $location, Event) {
    $scope.isActive = function (location) {
      return location === $location.path();
    };
  }]);
