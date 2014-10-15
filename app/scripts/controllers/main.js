'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$window', 'Workflow', 'ENV', function ($scope, $rootScope, $window, Workflow, ENV) {

    $scope.apiHost = ENV.host;

    Workflow.getConfig()
    .success(function(data){
      $scope.workflows = data;
    })
    .error(function(data, status, headers, config) {
      console.log('Error getting workflow', data, status, headers, config);
    });

    $scope.$watch('workflows', function(workflows) {

      var cwf = $window.localStorage.getItem('currentWorkflow');
      var workflowIndex = 0;
      if(cwf){
        workflowIndex = cwf;
      }

      if (workflows instanceof Array && workflows.length) {
        $scope.workflow = workflows[workflowIndex];
      }

    });

    $scope.setSessionWorkflow = function(workflow){
      $window.localStorage.setItem('currentWorkflow', JSON.stringify(workflow));
    };

  }]);
