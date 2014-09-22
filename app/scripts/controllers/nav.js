'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('NavCtrl', ['$scope', '$location', 'Event', function ($scope, $location, Event) {

    var currentSite = Event.getCurrentSite();
    if(currentSite === null){
      Event.setCurrentSite(0);
    }

    Event.getWorkflowConfig()
      .success(function(data){
        $scope.sites = data;
      })
      .error(function(data, status, headers, config) {
        console.log(data, status, headers, config);
      });

    $scope.isActive = function (location) {
      return location === $location.path();
    };
  }]);
