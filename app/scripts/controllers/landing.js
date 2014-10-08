'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('LandingCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

    var self = this;


    $rootScope.$on( '$routeChangeSuccess', function() {
      self.setLanding();
    });

    

    this.setLanding = function(){
      if($location.url() === '/'){
        $scope.landing = true;
      } else {
        $scope.landing = false;
      }
    };

    this.setLanding();

    

  }]);
