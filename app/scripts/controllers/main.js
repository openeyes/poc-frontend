'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'Workflow', function ($scope, $rootScope, Workflow) {

    Workflow.getConfig()
    .success(function(data){
      $scope.workflows = data;
    })
    .error(function(data, status, headers, config) {
      console.log('Error getting workflow', data, status, headers, config);
    });

    $scope.$watch('workflows', function(workflows) {
      
      if (workflows instanceof Array && workflows.length) {
        // Set default workflow
        $scope.workflow = workflows[0];
      }
    });

  }]);
