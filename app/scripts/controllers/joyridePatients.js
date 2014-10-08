'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:JoyridePatientsCtrl
 * @description
 * # JoyridePatientsCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('JoyridePatientsCtrl', ['$scope', '$rootScope', function ($scope,  $rootScope) {

    //determine which variant on the patients list page we are on before assigning scope object

  	$scope.config = [{      
  		type: "element",
      selector: "#workflow0",
      heading: "Test Item 1",
      placement: "right",
      text: "As an administrator, you can easily configure configure clinic workflows to reflect your organisation’s practices."
    }];

    $scope.startJoyRide = true;

  }]);
