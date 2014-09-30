'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('HistoryCtrl', ['$scope', 'History', 'Encounter', 'MODEL_DOMAIN', function($scope, History, Encounter, MODEL_DOMAIN){

    var self = this;

    this.init = function(){
      //  Listen for save event
      //  Broadcast by encounter page controller
      $scope.model = {};
      $scope.model.text = '';
      $scope.$on('encounter.save', this.broadcastModel);
      //  On creation populate dropdown

      History.getSlugs()
        .then(function(data) {
          $scope.slugs = data;
        }, function(error) {
          console.log(error);
        });


    };

    this.broadcastModel = function(){
      Encounter.addElement(self.getModel());
    };

    this.getModel = function(){
      return {
        name: MODEL_DOMAIN + 'History',
        model: $scope.model
      };
    };

    // $scope methods
    $scope.addSlug = function(slug, slugModel){
      $scope.model.text += ' ' + slug.label.toLowerCase() + ',';
      $scope[slugModel] = '';
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:history
   * @description
   * # history
   * Directive of the openeyesApp
   */
  .directive('oeHistory', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/history.html',
      controller: 'HistoryCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, HistoryCtrl) {
        HistoryCtrl.init(attrs);
      }
    };
  }]);
