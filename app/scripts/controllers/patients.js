'use strict';

angular.module('openeyesApp')
  .controller('PatientsCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.start = function($event, ticket) {

      $event.preventDefault();

      var url = [
        'patient',
        $scope.workflow._id.$oid,
        ticket._id.$oid,
        $scope.stepIndex
      ].join('/');

      $location.path(url);
    };

    document.body.classList.add('page-patients');

    $scope.$on('$destroy', function() {
      document.body.classList.remove('page-patients');
    });

  }]);
