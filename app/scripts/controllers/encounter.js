'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:EncounterCtrl
 * @description
 * # EncounterCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('EncounterCtrl', ['$scope', '$window', '$routeParams', '$location', '$rootScope', function ($scope, $window, $routeParams, $location, $rootScope) {

    $scope.mode = 'edit';
    $scope.formName = 'form';
    $scope.submitted = false;

    $scope.cancel = function() {
      $window.history.back();
    };

    $scope.navToLanding = function(){
      $location.path('/');
    };

    $scope.save = function(){
      $rootScope.$broadcast('encounter.save');
    };

    $scope.$on('encounter.save.complete', $scope.navToLanding);

    document.body.classList.add('page-encounter');

    $scope.$on('$destroy', function() {
      document.body.classList.remove('page-encounter');
    });

  }]);
