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

    function joyrideTriggerBarcode(){
      $('#joyride-barcode-button').trigger('click');      
    }

    function joyrideTriggerModal(){
      $('#joyride-complete').trigger('click');
    }

    function joyrideEndDemonstration(){
      //console.log('end demonstration method in encounterCtrl');
      $scope.startJoyRide = false;
      $rootScope.stopJoyRide = true;
      $('.modal').modal('hide');
      $location.url( '/#intro-section' );
    }

    function joyrideTriggerNext0(){
      var oid = $location.$$path.substring(9, 33);
      $location.path( '/patients/'+oid+'/1' );
      $('.modal').modal('hide');
    }

    function joyrideTriggerNext1(){
      var oid = $location.$$path.substring(9, 33);
      $location.path( '/patients/'+oid+'/2' );
      $('.modal').modal('hide');
    }

    $scope.onSkip = function(){
      //console.log('skip method in encounterCtrl');
      $rootScope.stopJoyRide = true;
    };

    var config0 = [{      
      type: 'element',
      selector: '#joyride-history',
      heading: 'Modularity',
      placement: 'bottom',
      text: '<span class="joyride-txt">Workflows are built comprising of modular elements, for example “History”, “Visual Acuity”.</span><br><span class="joyride-txt">These modules can easily be ordered, removed and new modules added to configure the workflow from the configuration file.</span>'
    },
    // ,{      
    //   type: 'element',
    //   selector: '#joyride-allergies',
    //   heading: 'Clinical Scalability',
    //   placement: 'bottom',
    //   text: '<span class="joyride-txt">Based on the requirements of this step in the patient’s care, and the user role, the user interface is reduced to only the functionality that is required.</span><br><span class="joyride-txt">This enables the solution to scale to meet the needs of other clinics in a way that does not expose the user to any increased complexity.</span>'
    // }
    {
      type: 'element',
      selector: '#joyride-acuity',
      heading: 'Continue',
      placement: 'top',
      text: '<span class="joyride-txt">Complete the remaining form to record the patient’s vision assessment.</span>'
    },{      
      type: 'element',
      selector: '#joyride-complete',
      heading: 'Step Complete',
      placement: 'top',
      text: '<span class="joyride-txt">Great! Your patient’s Vision Assessment is complete.</span><br><span class="joyride-txt">Click Save to complete this step in the clinic workflow.</span>'
    },{
      type:'function',
      fn: joyrideTriggerModal
    },{
      type: 'element',
      heading: 'Complete',
      selector: '#joyride-modal-button',
      placement: 'right',
      text: '<span class="joyride-txt">The patient has now moved into the next step of their treatment at the Clinic</span><br><span class="joyride-txt">Continue the workflow as the Doctor Optometrist</span>'
    },{
      type: 'function',
      fn: joyrideTriggerNext0
    }];

    var config1 = [
    // {      
    //   type: 'element',
    //   selector: '#joyride-history-title',
    //   heading: 'Workflow Service',
    //   placement: 'bottom',
    //   text: '<span class="joyride-txt">Workflow service supports both “views” of data and data entry.</span>'
    // }
    //,
    {      
      type: 'element',
      selector: '#joyride-topcon',
      heading: 'TopCon Report API',
      placement: 'top',
      text: '<span class="joyride-txt">Topcon 3DOCT report is integrated to assist assessment for Macular Degeneration through the TopCon Report API.</span><br><span class="joyride-txt">This integration removes the need for manual entry of content from one application to another.</span>'
    },{      
      type: 'element',
      selector: '#joyride-dicom',
      heading: 'DICOM Image Slices',
      placement: 'top',
      text: '<span class="joyride-txt">DICOM image slices are integrated to assist the Optometrist in their assessment for Macular Degeneration. This is enabled by the Java Virtual Machine with built in DICOM image libraries.</span>'
    },{      
      type: 'element',
      heading: 'continue',
      selector: '#joyride-dicom',
      placement: 'top',
      text: '<span class="joyride-txt">Complete the remaining form to prepare the patient for injection.</span>'
    },{      
      type: 'element',
      selector: '#joyride-complete',
      heading: 'Step Complete',
      placement: 'top',
      text: '<span class="joyride-txt">Great! Your patient is ready for their injection.</span><br><span class="joyride-txt">Click Save to complete this step in the clinic workflow.</span>'
    },{
      type:'function',
      fn: joyrideTriggerModal
    },{
      type: 'element',
      heading: 'Complete',
      selector: '#joyride-modal-button',
      placement: 'right',
      text: '<span class="joyride-txt">The patient has now completed their assessment.</span><br><span class="joyride-txt">Continue the workflow as the injecting nurse.</span>'
    },{
      type: 'function',
      fn: joyrideTriggerNext1
    }];

    var config2 = [
    // {      
    //   type: 'element',
    //   selector: '#joyride-workflow',
    //   heading: 'Workflow Service',
    //   placement: 'bottom',
    //   text: '<span class="joyride-txt">Workflow service supports both “views” of data and data entry.</span><br><span class="joyride-txt">Here you can see a summary of information from previous steps in the clinic workflow.</span><br><span class="joyride-txt">Select your injection site</span>'
    // }
    {
      type: 'element',
      selector: '#joyride-barcode',
      heading: 'Barcode Scanner Integration',
      placement: 'top',
      text: '<span class="joyride-txt">The nurse can easily capture the necessary details of the injection medication by scanning the label.</span><br><span class="joyride-txt">Click to scan your medication. You will need a barcode for this step.</span>'
    },{
      type: 'function', 
      fn: joyrideTriggerBarcode
    },{
      type: 'element',
      selector: '#joyride-treatment',
      heading: 'Barcode Scanner Integration',
      placement: 'top',
      text: '<span class="joyride-txt">This example of scanner integration reduces risk of human error and the time spent preparing the injection.</span>'
    },{
      type: 'element',
      selector: '#injection-person-rightEye',
      heading: 'Role based workflow',
      placement: 'right',
      text: '<span class="joyride-txt">User login is used to identify the injecting Nurse.</span><br><span class="joyride-txt">Should there be more than one Clinician present, the name can easily be changed through the dropdown.</span>'
    },{
      type:'function',
      fn: joyrideTriggerModal
    },{
      type: 'element',
      heading: 'Treatment complete',
      selector: '#joyride-modal-button',
      placement: 'right',
      text: '<span class="joyride-txt">The patient has now completed their treatment.</span>'
    },{
      type:'function',
      fn: joyrideEndDemonstration
    }];

    switch(locationPath){
      case 0: $scope.config = config0; 
      break;
      case 1: $scope.config = config1; 
      break;
      case 2: $scope.config = config2; 
      break;
    }

    function waitForDom(){
      //console.log('value of global in encounter stop', $rootScope.stopJoyRide, $scope.startJoyRide);
      if($rootScope.stopJoyRide === false){
        $scope.startJoyRide = true;
      }
    }
    $timeout(waitForDom, 1000);

    function removeCurtain(){
      $('#ng-curtain').remove();
    }
    $timeout(removeCurtain, 1000);
    
  }]);
