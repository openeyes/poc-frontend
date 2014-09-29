'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:OctSlicesViewCtrl
 * @description
 * # OctSlicesViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('OctSlicesViewCtrl', ['$scope', '$routeParams', 'Element', 'Ticket', 'MODEL_DOMAIN', function($scope, $routeParams, Element, Ticket, MODEL_DOMAIN){

    var self = this;
    var SLICE_HEIGHT = 100;

    this.image = null;
    this.imageUrl = '';
    this.$rightCanvas = null;
    this.$leftCanvas = null;

    $scope.currentSlice = 1;

    this.init = function(element){

      // Grab the right canvas to draw to
      // Could make a view per eye rather than this composite
      self.$rightCanvas = element.find('[data-side=rightEye]');

      $scope.model = {};
      $scope.patient = null;

      // $scope.$watch('patient', function(patient) {
      //   if (patient) {
      //     self.getElement();
      //   }
      // });

      // this.getPatient();

      // Fake getting image references
      self.imageUrl = Element.getOCTImages()[0];

      self.loadImage();

    };

    $scope.navToSlice = function(index){
      self.paintImageToCanvas(index);
    };

    this.loadImage = function(){
      self.image = new Image();
      self.image.src = self.imageUrl;
      self.image.onload = self.imageLoaded;
    };

    this.imageLoaded = function(){
      self.$rightCanvas.css('background-image', 'url(' + self.image.src + ')');
      self.$rightCanvas.css('background-size', '100% auto');
      $scope.navToSlice(0);
    };

    this.paintImageToCanvas = function(backgroundOffset){
      var adjustment = backgroundOffset * SLICE_HEIGHT;
      self.$rightCanvas.css('background-position-y', -adjustment + 'px');
    };

    // this.getPatient = function() {
    //   Ticket.getTicket($routeParams.ticketId)
    //     .then(function(data) {
    //       $scope.patient = data.data.patient;
    //     }, function(data, status, headers, config) {
    //       console.log('Error getting patient data', data, status, headers, config);
    //     });
    // };

    // this.getElement = function() {

    //   // Request element for todays date
    //   var today = Date.now();
    //   var eType = MODEL_DOMAIN + 'OctSlices';

    //   Element.getElements($scope.patient._id.$oid, eType, today)
    //     .then(function(data) {
    //       $scope.model = data.data[0];
    //     }, function(error) {
    //       console.log(error);
    //     });
    // };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:oeOctSlicesView
   * @description
   * # oeOctSlicesView
   * Directive of the openeyesApp
   */
  .directive('oeOctSlicesView', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/octSlicesView.html',
      controller: 'OctSlicesViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, OctSlicesViewCtrl) {
        OctSlicesViewCtrl.init(element);
      }
    };
  }]);
