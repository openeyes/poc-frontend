'use strict';

angular.module('openeyesApp')
  .controller('HeaderCtrl', ['$scope', '$attrs', '$location', '$routeParams', 'Workflow', function($scope, $attrs, $location, $routeParams, Workflow){


    this.init = function() {
      this.getWorkflow();
      $scope.$on('$routeChangeSuccess', this.getWorkflow.bind(this));
      $scope.$watch('workflow', function(workflow) {
        if (workflow) {
          $scope.step = $scope.workflow.steps[$routeParams.stepIndex];
        }
      });
      $scope.isActive = function (location) {
        return location === $location.path();
      };
    };

    this.getWorkflow = function() {
      if (!$routeParams.workflowId) {
        $scope.workflow = null;
        $scope.step = null;
        return;
      }
      Workflow.getConfig($routeParams.workflowId)
        .then(function(response){
          $scope.workflow = response.data;
        }, function(data, status, headers, config) {
          console.log('Error getting workflow', data, status, headers, config);
        });
    };

    //TODO: remove temporary event handler.
    //This is prevents the search button being clicked
    $scope.preventClickEvent = function($event){
      $event.preventDefault();
    };

  }])
  .directive('oeHeader', [function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'views/directives/header.html',
      controller: 'HeaderCtrl',
      link: function ($scope, element, attrs, HeaderCtrl) {
        HeaderCtrl.init();
      }
    };
  }]);
