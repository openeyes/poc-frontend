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
    var locationPath = parseInt($location.$$path.slice(-1),10);

    var config0 = [{      
      type: "element",
      selector: ".patient-pic",
      heading: 'Modularity',
      placement: 'bottom',
      text: "<span class='joyride-txt'>Workflows are built comprising of modular elements, for example “History”, “Visual Acuity”.</span><br><span class='joyride-txt'>These modules can easily be ordered, removed and new modules added to configure the workflow from the configuration file.</span>"
    },{      
      type: "element",
      selector: "#joyride-history",
      heading: 'Clinical Scalability',
      placement: 'bottom',
      text: "<span class='joyride-txt'>Based on the requirements of this step in the patient’s care, and the user role, the user interface is reduced to only the functionality that is required.</span><br><span class='joyride-txt'>This enables the solution to scale to meet the needs of other clinics in a way that does not expose the user to any increased complexity.</span>"
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