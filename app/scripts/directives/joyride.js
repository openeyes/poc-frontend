'use strict';

angular.module('openeyesApp')
  .controller('JoyrideSwitchCtrl', ['$scope', '$attrs', '$rootScope', '$timeout',  function($scope, $attrs, $rootScope, $timeout){

    function removeCurtain(){
      $('#ng-curtain').remove();
    }

    $scope.onSkip = function(){
      $rootScope.stopJoyRide = true;
      $scope.joyrideState = false;
    };

    $scope.SetJoyrideState = function(joyrideState){
      if(joyrideState){
        $scope.startJoyRide = true;
        $rootScope.stopJoyRide = false;
        $timeout(removeCurtain, 500); //Need to disable this on all screens to allow users to select other controls
      }else{
        //cancel existing popups on screen
        $scope.startJoyRide = false;
        $rootScope.stopJoyRide = true;

        //trigger skip button
        angular.element('.skipBtn').trigger('click');
      }
    };
  }])
  .directive('oeJoyrideSwitch', [function () {
    return {
      restrict: 'E', //E = element, A = attribute, C = class, M = comment
      controller: 'JoyrideSwitchCtrl',
      link: function ($scope, element, attr, JoyrideSwitchCtrl) {
      }
    };
  }]);
