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

    //determine which variant on the patients list page we are on before assigning scope object
    var locationPath = parseInt($location.$$path.slice(-1),10);

    var config0 = [{      
      type: "element",
      selector: ".navbar-brand",
      placement: 'bottom',
      text: "<span class='joyride-txt'>Click the logo to go back to the start page at any time</span>",
      curtainClass: 'hideCurtain'
    },{      
      type: "element",
      selector: "#joyride-close .patient-pic",
      heading: 'Patient List',
      placement: 'bottom',
      text: "<span class='joyride-txt'>The patient list is live and updated as patients attend the Clinic. Each Clinician has their own Patient List.</span><br><span class='joyride-txt'>Click on your next patient to assess their vision.</span>",
      curtainClass: 'hideCurtain'
    }];

    var config1 = [{      
      type: "title",
      selector: '.nav-bar',
      heading: "Test Item 2",
      text: "As an administrator, you can easily configure configure clinic workflows to reflect your organisation’s practices."
    }];

    var config2 = [{      
      type: "title",
      heading: "Test Item 2",
      text: "As an administrator, you can easily configure configure clinic workflows to reflect your organisation’s practices."
    }];


    switch(locationPath){
      case 0: $scope.config = config0; 
      break;
      case 1: $scope.config = config1; 
      break;
      case 2: $scope.config = config2; 
      break;
    }

  
    $scope.startJoyRide = true;

  }]);
