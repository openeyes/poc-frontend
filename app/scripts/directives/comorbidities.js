'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:ComorbiditiesCtrl
 * @description
 * # ComorbiditiesCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('ComorbiditiesCtrl', ['$scope', 'Conditions', 'Encounter', function($scope, Conditions, Encounter){

    var self = this;

    this.init = function(){
      //  Listen for save event
      //  Broadcast by encounter page controller
      $scope.$on('encounter.save', this.broadcastModel);
      //  On creation populate dropdown

      Conditions.getComorbidities()
        .then(function(data) {
          $scope.comorbidities = data;
        }, function(error) {
          console.log(error);
        });


    };

    this.broadcastModel = function(){
      Encounter.addElement(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'comorbidities',
        model: $scope.model
      };
    };


  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:comorbidities
   * @description
   * # comorbidities
   * Directive of the openeyesApp
   */
  .directive('oeComorbidities', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/comorbidities.html',
      controller: 'ComorbiditiesCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, ComorbiditiesCtrl) {
        ComorbiditiesCtrl.init(attrs);
      }
    };
  }]);
