'use strict';

angular.module('openeyesApp')
  .controller('OctRetinalView', ['$scope', '$attrs', 'Element', function($scope, $attrs, Element){

    var self = this;

    this.init = function() {

      $scope.selectedImage = null;

      this.getData()
      .then($scope.select);
    };

    $scope.select = function(image) {
      $scope.selectedImage = image || $scope.images[0];
      $scope.style = {
        'background-image': 'url("' + $scope.selectedImage + '")'
      };
    };

    this.getData = function() {
      return Element.getRetinalScans()
        .then(function(response) {
          var data = response.data[$attrs.side];
          $scope.images = data.images;
          $scope.crt = data.crt;
          $scope.st = data.st;
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
        OctRetinalView.init();
      }
    };
  }]);
