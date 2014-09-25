'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:InjectionSiteViewCtrl
 * @description
 * # InjectionSiteViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('InjectionSiteViewCtrl', ['$scope', '$routeParams', 'Element', 'Ticket', 'MODEL_DOMAIN', function($scope, $routeParams, Element, Ticket, MODEL_DOMAIN){

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
      var eType = MODEL_DOMAIN + 'InjectionSite';

      Element.getElements($scope.patient._id.$oid, eType, today)
        .then(function(data) {
          $scope.rightEye = data.data[0].rightEye.data;
          $scope.leftEye = data.data[0].leftEye.data;
        }, function(error) {
          console.log(error);
        });
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:oeInjectionSiteView
   * @description
   * # oeInjectionSiteView
   * Directive of the openeyesApp
   */
  .directive('oeInjectionSiteView', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/injectionSiteView.html',
      controller: 'InjectionSiteViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, InjectionSiteViewCtrl) {
        InjectionSiteViewCtrl.init();
      }
    };
  }]);
