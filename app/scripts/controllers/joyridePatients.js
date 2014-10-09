'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:JoyridePatientsCtrl
 * @description
 * # JoyridePatientsCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('JoyridePatientsCtrl', ['$scope', '$rootScope', '$location', '$timeout', function ($scope,  $rootScope, $location, $timeout) {

    //determine which variant on the patients list page we are on before assigning scope object
    var locationPath = parseInt($location.$$path.slice(-1),10);

    var config0 = [{      
      type: "element",
      selector: ".navbar-brand",
      placement: 'bottom',
      text: "<span class='joyride-txt'>Click the logo to go back to the start page at any time</span>"
    },{      
      type: "element",
      selector: "#joyride-0 .patient-pic",
      heading: 'Patient List',
      placement: 'bottom',
      text: "<span class='joyride-txt'>The patient list is live and updated as patients attend the Clinic. Each Clinician has their own Patient List.</span><br><span class='joyride-txt'>Click on your next patient to assess their vision.</span>"
    },{
      type: "function",
      fn: joyrideTriggerNext
    }];

    var config1 = [{      
      type: "element",
      selector: '#joyride-0 .patient-pic',
      heading: "Patient List",
      placement: 'bottom',
      text: "<span class='joyride-txt'>Your patient has had their OCT scan, and now moved to the next step in their care - Assessment for Macular Degeneration</span><br><span class='joyride-txt'>Click on your next patient to complete your Assessment for Macular Degeneration.</span>"
    },{
      type: "function",
      fn: joyrideTriggerNext
    }];

    var config2 = [{      
      type: "element",
      selector: '#joyride-0 .patient-pic',
      heading: "Patient List",
      text: "<span class='joyride-txt'>Your patient has now moved to the next step in their care - Injection.</span><br><span class='joyride-txt'>Click on your next patient to complete your Injection.</span>"
    },{
      type: "function",
      fn: joyrideTriggerNext
    }];


    switch(locationPath){
      case 0: $scope.config = config0; 
      break;
      case 1: $scope.config = config1; 
      break;
      case 2: $scope.config = config2; 
      break;
    }

    function joyrideTriggerNext(){
      $("#joyride-0").trigger("click");
    }

  
    $timeout(waitForDom, 500);
    function waitForDom(){
      $scope.startJoyRide = true;
    }

  }]);
