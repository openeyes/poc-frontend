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
      var $oid = data[0]._id.$oid;
      //set dynamic variables of paths in joyride config
      $rootScope.$broadcast('joyride.config', $oid);
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
