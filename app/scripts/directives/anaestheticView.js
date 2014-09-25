'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AnaestheticViewCtrl
 * @description
 * # AnaestheticViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('AnaestheticViewCtrl', ['$scope', '$routeParams', 'Element', 'Ticket', 'MODEL_DOMAIN', function($scope, $routeParams, Element, Ticket, MODEL_DOMAIN){

    var self = this;

    this.init = function(){

      $scope.model = {};
      $scope.patient = null;

      $scope.$watch('patient', function(patient) {
        if (patient) {
          self.getElement();
        }
      });

      this.getPatient();
    };

    this.getPatient = function() {
      Ticket.getTicket($routeParams.ticketId)
        .then(function(data) {
          $scope.patient = data.data.patient;
        }, function(data, status, headers, config) {
          console.log('Error getting patient data', data, status, headers, config);
        });
    };

    this.getElement = function() {

      // Request element for todays date
      var today = Date.now();
      var eType = MODEL_DOMAIN + 'Anaesthetic';

      Element.getElements($scope.patient._id.$oid, eType, today)
        .then(function(data) {
          $scope.model = data.data[0];
          console.log($scope.model);
        }, function(error) {
          console.log(error);
        });
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:oeAnaestheticView
   * @description
   * # oeAnaestheticView
   * Directive of the openeyesApp
   */
  .directive('oeAnaestheticView', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/anaestheticView.html',
      controller: 'AnaestheticViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, AnaestheticViewCtrl) {
        AnaestheticViewCtrl.init();
      }
    };
  }]);
