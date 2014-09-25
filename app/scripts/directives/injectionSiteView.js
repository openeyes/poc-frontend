'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:InjectionSiteViewCtrl
 * @description
 * # InjectionSiteViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('InjectionSiteViewCtrl', ['$scope', '$routeParams', 'Element', 'MODEL_DOMAIN', function($scope, $routeParams, Element, MODEL_DOMAIN){

    this.init = function(){

      $scope.model = {};

      // Request element for todays date
      var today = Date.now();
      var eType = MODEL_DOMAIN + 'InjectionSite';

      Element.getElements($routeParams.patientId, eType, today)
        .then(function(data) {
          $scope.model = data.data[0];
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
