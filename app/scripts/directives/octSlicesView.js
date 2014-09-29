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

    this.images = [];
    this.imageUrls = [];
    this.totalImages = 10;
    this.numImagesLoaded = 0;
    this.$rightCanvas = null;
    this.$leftCanvase = null;

    $scope.currentSlice = 1;

    this.init = function(element){

      // Grab the right canvas to draw to
      // Could make a view per eye rather than this composite
      self.$rightCanvas = element.find('canvas[data-side=rightEye]');

      $scope.model = {};
      $scope.patient = null;

      // $scope.$watch('patient', function(patient) {
      //   if (patient) {
      //     self.getElement();
      //   }
      // });

      // this.getPatient();

      // Fake getting image references
      for(var i = 1;i <= self.totalImages;i++){
        self.imageUrls.push('/images/oct-slices/slice_' + i + '.jpg');
      }

      self.loadImages();

    };

    $scope.navToSlice = function(index){
      self.paintImageToCanvas(self.images[index]);
    };

    this.loadImages = function(){
      for(var i = 0;i < self.totalImages;i++){
        var img = new Image();
        img.src = self.imageUrls[i];
        img.onload = self.imageLoaded;
        self.images.push(img);
      }
    };

    this.imageLoaded = function(){
      self.numImagesLoaded++;
      //  Are all images now loaded?
      if(self.numImagesLoaded === self.totalImages){
        $scope.navToSlice(0);
      }
    };

    this.paintImageToCanvas = function(image){
      var ctx = self.$rightCanvas[0].getContext('2d');
      // Scale image and draw to canvas
      ctx.drawImage(image, 0, 0,512,100);
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
