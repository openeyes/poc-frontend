'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:JoyrideEncounterCtrl
 * @description
 * # JoyrideEncounterCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('JoyrideEncounterCtrl', ['$scope', '$rootScope', '$location', '$timeout', function ($scope,  $rootScope, $location, $timeout) {

  	//determine which variant on the form page we are on before assigning scope object
    var locationPath = parseInt($location.$$path.slice(-1),10);

    var config0 = [{      
      type: "element",
      selector: "#joyride-pic",
      heading: 'Modularity',
      placement: 'bottom',
      text: "<span class='joyride-txt'>Workflows are built comprising of modular elements, for example “History”, “Visual Acuity”.</span><br><span class='joyride-txt'>These modules can easily be ordered, removed and new modules added to configure the workflow from the configuration file.</span>"
    },{      
      type: "element",
      selector: "#joyride-history",
      heading: 'Clinical Scalability',
      placement: 'bottom',
      text: "<span class='joyride-txt'>Based on the requirements of this step in the patient’s care, and the user role, the user interface is reduced to only the functionality that is required.</span><br><span class='joyride-txt'>This enables the solution to scale to meet the needs of other clinics in a way that does not expose the user to any increased complexity.</span>"
    },{
      type: "element",
      selector: "#joyride-acuity",
      placement: 'bottom',
      text: "<span class='joyride-txt'>Complete the remaining form to record the patient’s vision assessment.</span>"
    },{      
      type: "element",
      selector: "#joyride-complete",
      heading: 'Step Complete',
      placement: 'top',
      text: "<span class='joyride-txt'>Great! Your patient’s Vision Assessment is complete.</span><br><span class='joyride-txt'>Click Save to complete this step in the clinic workflow.</span>"
    },{
      type:"function",
      fn: joyrideTriggerModal
    },{
      type: "element",
      selector: "#joyride-modal-button",
      placement: 'right',
      text: "<span class='joyride-txt'>The patient has now moved into the next step of their treatment at the Clinic</span><br><span class='joyride-txt'>Continue the workflow as the Doctor Optometrist</span>"
    },{
      type: "function",
      fn: joyrideTriggerNext
    }];

    function joyrideTriggerModal(){
      $("#joyride-complete").trigger("click");
    }

    function joyrideTriggerNext(){
      var oid = $location.$$path.substring(9, 33);
      $location.path( "/patients/"+oid+"/1" );
      $('.modal').modal('hide')
    }

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

    $timeout(waitForDom, 500);
    function waitForDom(){
      $scope.startJoyRide = true;
    }

    $timeout(removeCurtain, 1000);
    function removeCurtain(){
      $("#ng-curtain").remove();
    }

  }]);
