'use strict';

angular.module('openeyesApp')
  .controller('OctRetinalView', ['$scope', '$attrs', '$routeParams', '$animate', '$element', 'Element', 'Ticket', 'MODEL_DOMAIN', function($scope, $attrs, $routeParams, $animate, $element, Element, Ticket, MODEL_DOMAIN){

    var self = this;
    var containerWidth;

    this.init = function() {

      containerWidth = $element.find('.img-viewer').width();

      $animate.enabled(false, $element);

      $scope.selectedImage = null;
      $scope.images = [];
      $scope.loaded = false;
      $scope.side = $attrs.side;

      this.getPatient()
      .then(this.getElement)
      .then(this.formatImages)
      .then($scope.select);
    };

    $scope.select = function(image) {

      if (!$scope.images.length) {
        return;
      }

      $scope.selectedImage = image || $scope.images[0];

      var img = new Image();
      img.src = $scope.selectedImage;

      $scope.style = {
        'background-image': 'url("' + $scope.selectedImage + '")',
        'background-size': img.width >= containerWidth ? 'contain' : 'initial'
      };
    };

    this.formatImages = function() {
      if (!$scope.model) {
        return;
      }
      $scope.images = [
        'bscanXPlaneImage',
        'bscanYPlaneImage',
        'colourFundusImage',
        'redFreeImage',
        'etdrsMapImage',
        'surfaceDataImage'
      ].map(function(image) {
        return 'data:image/png;base64,' + $scope.model[image].data;
      });
    };

    this.getPatient = function() {
      return Ticket.getTicket($routeParams.ticketId)
        .then(function(data) {
          $scope.patient = data.data.patient;
        }, function(data, status, headers, config) {
          console.log('Error getting patient data', data, status, headers, config);
        });
    };

    this.getElement = function() {

      var today = Date.now();
      var eType = MODEL_DOMAIN + 'TopconReport';

      return Element.getElements($scope.patient._id.$oid, eType, today)
        .then(function(response) {
          $scope.model = response.data.filter(function(data) {
            return data.eye + 'Eye' === $attrs.side
          })[0];
          $scope.loaded = true;
        }, function(error) {
          console.log(error);
        });
    };
  }])
  .directive('oeOctReportView', [function () {
    return {
      restrict: 'E', //E = element, A = attribute, C = class, M = comment
      scope: {},
      replace: true,
      templateUrl: 'views/directives/octReportView.html',
      controller: 'OctRetinalView', //Embed a custom controller in the directive
      link: function (scope, element, attrs, OctRetinalView) {
        OctRetinalView.init();
      }
    };
  }]);
