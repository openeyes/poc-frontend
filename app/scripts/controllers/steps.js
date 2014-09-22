'use strict';

angular.module('openeyesApp')
  .controller('StepsCtrl', ['$scope', '$routeParams', 'Event', 'Patient', function ($scope, $routeParams, Event, Patient) {

    var self = this;

    $scope.patients = [];
    $scope.steps = [];

    this.showPatients = function() {

      Patient.getPatientsForStep()
        .then(function(data) {
          $scope.patients = data.data;
        }, function() {
          console.log('Error getting patients for step:', step);
        });

      $scope.stepId = parseInt($routeParams.stepId, 10);

      $scope.$watch('sites', function(sites) {
        if (sites) {
          $scope.site = self.getSite();
          $scope.step = self.getStep();
        }
      });
    };

    this.getSite = function() {
      return $scope.sites.filter(function(site) {
        return site._id.$oid === $routeParams.siteId;
      })[0];
    };

    this.getStep = function() {
      return $scope.site.steps[$scope.stepId];
    };

    this.showSteps = function(site) {

      $scope.site = 0;

      $scope.$watch('site', function(site) {
        if (site !== undefined) {
          Event.setCurrentSite(site);
        }
      });

      $scope.$watch('sites', function(sites) {
        if (sites) {
          $scope.steps = sites[$scope.site].steps;
          $scope.siteId = sites[$scope.site]._id.$oid;
        }
      });
    };

    Event.getWorkflowConfig()
      .success(function(data){
        $scope.sites = data;
      })
      .error(function(data, status, headers, config) {
        console.log(data, status, headers, config);
      });

    if ($routeParams.stepId) {
      this.showPatients();
    } else {
      this.showSteps();
    }
  }]);
