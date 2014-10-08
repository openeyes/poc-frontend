'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:JoyridePatientsCtrl
 * @description
 * # JoyridePatientsCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('JoyridePatientsCtrl', ['$scope', '$rootScope', '$location', function ($scope,  $rootScope, $location) {


    var config0 = [{      
      type: "title",
      heading: "Test Item 1",
      text: "As an administrator, you can easily configure configure clinic workflows to reflect your organisation’s practices."
    }];

    var config1 = [{      
      type: "title",
      heading: "Test Item 2",
      text: "As an administrator, you can easily configure configure clinic workflows to reflect your organisation’s practices."
    }];


    
    //determine which variant on the patients list page we are on before assigning scope object
    var locationPath = parseInt($location.$$path.slice(-1),10);

    //console.log($scope, $location, $rootScope, locationPath);

    switch(locationPath){
      case 0: $scope.config = config0; 
      break;
      case 1: $scope.config = config1; 
      break;
    }

  
    $scope.startJoyRide = true;

  }]);
