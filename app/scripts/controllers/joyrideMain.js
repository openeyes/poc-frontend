'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:JoyrideMainCtrl
 * @description
 * # JoyrideMainCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('JoyrideMainCtrl', ['$scope', '$rootScope', function ($scope,  $rootScope) {

  	$scope.config = [{
      type: "location_change",
      path: "/"
    },{
      type: "element",
      selector: "#workflow0",
      heading: "Configurable",
      placement: "right",
      text: "As an administrator, you can easily configure configure clinic workflows to reflect your organisation’s practices."
    },{
      type: "element",
      selector: "#workflow1",
      heading: "Configurable",
      placement: "right",
      text: "<span class='joyride-txt'>A separate configuration file with the designed workflow informs the user interface what functionality to enable where.</span><br><span>Click to see Northwick Park Hospital’s workflow.</span>"
    },{
      type: "element",
      selector: "#workflow2",
      heading: "Configurable",
      placement: "right",
      text: "<span class='joyride-txt'>The steps a patient must go through for their treatment, their workflow, is configured by user role and location.</span><br><span class='joyride-txt'>User roles and login with permissions would be implemented going forward from this proof of concept.</span><br><span>Click to view Moorfield Eye Hospitals Workflow and select the first step in the patient’s visit to the Medical Retina Injection Clinic.</span>"
    },{
      type:"function",
      fn: joyrideTriggerNext
    }];
    
    function joyrideTriggerNext(){
      $("#workflow0").trigger("click");
    }

    $scope.beginJoyRide = function(){
      $scope.startJoyRide = true;
    };

    $scope.$on('joyride.start', $scope.beginJoyRide);

  }]);
