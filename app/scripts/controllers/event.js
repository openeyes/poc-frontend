'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('EventCtrl', ['$scope', '$window', '$routeParams', '$location', '$rootScope', 'Event', function ($scope, $window, $routeParams, $location, $rootScope, Event) {

    $scope.event = null;
    $scope.mode = 'edit';
    $scope.formName = 'form';
    $scope.submitted = false;

    function loadEvent(eventId){
      Event.getEvent(eventId)
        .success(function(data) {
          $scope.event = data;
        })
        .error(function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });
    }

    if($routeParams.patientId && $routeParams.eventId){
      $scope.mode = 'view';
      loadEvent($routeParams.eventId);
    }

    $scope.cancel = function() {
      $window.history.back();
    };

    $scope.navToLanding = function(){
      $location.path('/');
    };

    $scope.save = function(){
      $rootScope.$broadcast('event.save');
    };

    $scope.$on('event.save.complete', $scope.navToLanding);

    document.body.classList.add('page-event');

    $scope.$on('$destroy', function() {
      document.body.classList.remove('page-event');
    });

  }]);
