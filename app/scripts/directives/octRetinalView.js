'use strict';

angular.module('openeyesApp')
  .controller('OctRetinalView', ['$scope', '$routeParams', '$timeout', 'Element', 'MODEL_DOMAIN', function($scope, $routeParams, $timeout, Element, MODEL_DOMAIN){

    var self = this;

    this.init = function() {

      $scope.selectedImage = null;

      this.getImageData()
      .then($scope.select);
    };

    $scope.select = function(image) {
      $scope.selectedImage = image || $scope.images[0];
      $scope.style = {
        'background-image': 'url("' + $scope.selectedImage + '")'
      };
    };

    this.getImageData = function() {
      return Element.getRetinalScans()
        .then(function(response) {
          $scope.images = response.data;
        }, function() {
          console.log('Error getting retinal scans');
        });
    };
  }])
  .directive('oeOctRetinalView', [function () {
    return {
      restrict: 'E', //E = element, A = attribute, C = class, M = comment
      scope: {},
      replace: true,
      templateUrl: 'views/directives/octRetinalView.html',
      controller: 'OctRetinalView', //Embed a custom controller in the directive
      link: function (scope, element, attrs, OctRetinalView) {
        OctRetinalView.init(element);
      }
    };
  }]);
