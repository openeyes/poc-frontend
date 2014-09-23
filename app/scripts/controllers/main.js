'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('MainCtrl', ['$scope', 'Event', function ($scope, Event) {

    var labels = [
      'Vision Assessment by Optometrist',
      'Assessment for Macular Degeneration by Fellow in Clinic',
      'Injection by Nurse'
    ];

    Event.getWorkflowConfig()
    .success(function(data){
      $scope.workflows = data;
    })
    .error(function(data, status, headers, config) {
      console.log('Error getting workflow', data, status, headers, config);
    });

    $scope.$watch('workflows', function(workflows) {
      if (workflows instanceof Array && workflows.length) {
        $scope.workflow = $scope.workflow || workflows[0];
        $scope.steps = $scope.workflow.steps.map(function(step, i) {
          return angular.extend(step, {
            label: labels[i],
            id: i
          });
        });
      }
    });
  }]);
