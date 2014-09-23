'use strict';

angular.module('openeyesApp')
  .controller('StepsCtrl', ['$scope', '$routeParams', 'Event', 'Patient', function ($scope, $routeParams, Event, Patient) {

    var self = this;

    var labels = [
      'Vision Assessment by Optometrist',
      'Assessment for Macular Degeneration by Fellow in Clinic',
      'Injection by Nurse'
    ];

    this.showPatients = function() {

      this.getWorkFlow();
      this.getPatients();

      $scope.$watch('sites', function(sites) {
        if (sites instanceof Array && sites.length) {
          $scope.site = self.getSite($scope.sites, $routeParams.siteId);
          $scope.step = self.getStep($scope.site.steps, parseInt($routeParams.stepId, 10));
        }
      });
    };

    this.showSteps = function(site) {

      this.getWorkFlow();

      $scope.$watch('site', function(site) {
        if (site !== undefined) {
          Event.setCurrentSite(site);
        }
      });

      $scope.$watch('sites', function(sites) {
        if (sites instanceof Array && sites.length) {
          $scope.site = $scope.site || sites[0];
          $scope.steps = $scope.site.steps.map(function(step, i) {
            return angular.extend(step, {
              label: labels[i],
              id: i
            });
          });
        }
      });
    };

    this.getWorkFlow = function() {
      Event.getWorkflowConfig()
      .success(function(data){
        $scope.sites = data;
      })
      .error(function(data, status, headers, config) {
        console.log('Error getting workflow', data, status, headers, config);
      });
    };

    this.getPatients = function() {
      Patient.getPatientsForStep()
      .then(function(data) {
        $scope.patients = data.data;
      }, function(data, status, headers, config) {
        console.log('Error getting patients for step:', step, data, status, headers, config);
      });
    }

    this.getSite = function(sites, id) {
      return sites.filter(function(site) {
        return site._id.$oid === id;
      })[0];
    };

    this.getStep = function(steps, id) {
      return angular.extend(steps[id], {
        label: labels[id],
        id: id
      });
    };

    if ($routeParams.stepId) {
      this.showPatients();
    } else {
      this.showSteps();
    }
  }]);
