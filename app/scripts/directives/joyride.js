'use strict';

angular.module('openeyesApp')
  .controller('JoyrideSwitchCtrl', ['$scope', '$attrs', '$rootScope', '$timeout',  function($scope, $attrs, $rootScope, $timeout){

    this.init = function(){
    };

    function removeCurtain(){
      $('#ng-curtain').remove();
    }

    $scope.onSkip = function(){
      //console.log('skip method in joyrideCtrl');
      $rootScope.stopJoyRide = true;
      $scope.joyrideState = false;
    };


    $scope.SetJoyrideState = function(joyrideState){
      if(joyrideState){
        $scope.startJoyRide = true;
        $rootScope.stopJoyRide = false;
        $timeout(removeCurtain, 500); //Need to disable this on all screens to allow users to select other controls

        //console.log('switch stop', $rootScope.stopJoyRide);
      }else{
        //cancel existing popups on screen
        //console.log('state changing in switchCtrl and setting to false');
        $scope.startJoyRide = false;
        $rootScope.stopJoyRide = true;

        //trigger skip button
        $('.skipBtn').trigger('click');
      }
    };
  }])
  .directive('oeJoyrideSwitch', [function () {
    return {
      restrict: 'E', //E = element, A = attribute, C = class, M = comment
      controller: 'JoyrideSwitchCtrl',
      link: function ($scope, element, attr, JoyrideSwitchCtrl) {
        JoyrideSwitchCtrl.init();
      }
    };
  }]);
