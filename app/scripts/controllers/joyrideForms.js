'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:JoyrideFormsCtrl
 * @description
 * # JoyrideFormsCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('JoyrideFormsCtrl', ['$scope', '$rootScope', function ($scope,  $rootScope) {

  	//determine which variant on the form page we are on before assigning scope object

  	$scope.config = [{
      type: "location_change",
      path: "/"
    },{      
  		type: "element",
      selector: "#workflow0",
      heading: "Test Item 1",
      placement: "right",
      text: "As an administrator, you can easily configure configure clinic workflows to reflect your organisation’s practices."
    }];

    $scope.startJoyRide = true;

  }]);
