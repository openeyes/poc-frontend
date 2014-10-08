'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:JoyrideCtrl
 * @description
 * # JoyrideCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('JoyrideCtrl', ['$scope', '$rootScope', '$location', function ($scope,  $rootScope, $location) {

  	$scope.configScope = {}

  	$scope.oid = "";

  	$scope.config = [{
      type: "location_change",
      path: "/"
    },{      
  		type: "element",
      selector: "#workflow0",
      heading: "Test Item 1",
      placement: "right",
      text: "As an administrator, you can easily configure configure clinic workflows to reflect your organisation’s practices."
    }
    ];

    $scope.$on('$routeChangeSuccess', function(){
    	console.log($location.$$path)
 
    	if($location.$$path !== '/'){
    		console.log("patients page")
	    	
	    	// $scope.config = [{
	    	// 	type: "element",
	     //  	selector: ".navbar-brand",
	     //  	heading: "Test Item 2",
	     //  	text: 'demo this'
	    	// }];
	    	// $scope.startJoyRide = true;
    	}
    })

  	// $scope.config = [{
   //    type: "location_change",
   //    path: "/"
   //  },{
   //    type: "element",
   //    selector: "#workflow0",
   //    heading: "Configurable",
   //    placement: "right",
   //    text: "As an administrator, you can easily configure configure clinic workflows to reflect your organisation’s practices."
   //  },{
   //    type: "element",
   //    selector: "#workflow1",
   //    heading: "Configurable",
   //    placement: "right",
   //    text: "<span class='joyride-txt'>A separate configuration file with the designed workflow informs the user interface what functionality to enable where.</span><br><span>Click to see Northwick Park Hospital’s workflow.</span>"
   //  },{
   //    type: "element",
   //    selector: "#workflow2",
   //    heading: "Configurable",
   //    placement: "right",
   //    text: "<span class='joyride-txt'>The steps a patient must go through for their treatment, their workflow, is configured by user role and location.</span><br><span class='joyride-txt'>User roles and login with permissions would be implemented going forward from this proof of concept.</span><br><span>Click to view Moorfield Eye Hospitals Workflow and select the first step in the patient’s visit to the Medical Retina Injection Clinic.</span>"
   //  },
   //  {
   //  	type: "location_change",
   //    path: "/patients/54229aa06c5873493a28b464/0"
	  // },{
   //    type: "element",
   //    selector: ".navbar-brand",
   //    placement: "bottom",
   //    text: "<span class='joyride-txt'>Click the logo to go back to the start page at any time</span>"
   //  },{
   //    type: "element",
   //    selector: ".navbar-brand",
   //    placement: "bottom",
   //    text: "<span class='joyride-txt'>The patient list is live and updated as patients attend the Clinic. Each Clinician has their own Patient List.</span><br><span class='joyride-txt'>Click on your next patient to assess their vision.</span>"
   //  }
	  // ];

	  //TODO: hardcoding path for now. Needs to be dynamic somehow
	  //need to dynamically update config before it loads - doesn't work
    
    $scope.beginJoyRide = function(){
      $scope.startJoyRide = true;
    };

    // $scope.assignConfig = function(event, data){
    //   $scope.oid = data;
    //   console.log("publish data", data)
    // };

    $scope.$on('joyride.start', $scope.beginJoyRide);
    // $scope.$on('joyride.config', $scope.assignConfig);



  }]);
