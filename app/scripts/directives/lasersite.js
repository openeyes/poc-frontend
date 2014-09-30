'use strict';

angular.module('openeyesApp')
  .controller('LaserSiteCtrl', ['$scope', 'Site', 'Encounter', 'Workflow', 'MODEL_DOMAIN', function($scope, Site, Encounter, Workflow, MODEL_DOMAIN){

    var self = this;

    $scope.model = {};
    $scope.form = Encounter.getForm();
    $scope.rules = Workflow.getValidationRules('laserSite');

    this.init = function(){

      //  Listen for save event
      //  Broadcast by encounter page controller
      $scope.$on('encounter.save', this.broadcastModel);

      //  On creation populate sites dropdown
      Site.getSites()
        .success(function(data) {
          $scope.sites = data;
        })
        .error(function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });

      Site.getLaserOperators()
        .success(function(data) {
          $scope.laserOperators = data;
        })
        .error(function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });
    };

    this.broadcastModel = function(){
      Encounter.addElement(self.getModel());
    };

    this.getModel = function(){
      return {
        name: MODEL_DOMAIN + 'LaserSite',
        model: $scope.model
      };
    };

    $scope.siteSelected = function(){
      // Populate laser dropdown for this site
      Site.getLasersForSite($scope.model.site.id)
      .success(function(data) {
        $scope.lasers = data;
      })
      .error(function(data, status, headers, config) {
        console.log(data, status, headers, config);
      });
    };
  }])
  .directive('oeLaserSite', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/lasersite.html',
      controller: 'LaserSiteCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, LaserSiteCtrl) {
        LaserSiteCtrl.init(scope);
      }
    };
  }]);
