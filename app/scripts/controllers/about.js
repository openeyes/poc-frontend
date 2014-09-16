'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('AboutCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
