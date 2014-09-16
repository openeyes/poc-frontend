'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('HistoryCtrl', ['$scope', 'History', 'Event', function($scope, History, Event){

    var self = this;

    this.init = function(){
      //  Listen for save event
      //  Broadcast by event page controller
      $scope.model = {};
      $scope.model.history = '';
      $scope.$on('event.save', this.broadcastModel);
      //  On creation populate dropdown

      History.getSlugs()
        .then(function(data) {
          $scope.slugs = data;
        }, function(error) {
          console.log(error);
        });


    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'history',
        model: $scope.model
      };
    };

    // $scope methods
    $scope.addSlug = function(slug, slugModel){
      $scope.model.history += ' ' + slug.label.toLowerCase() + ',';
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
  .directive('history', [function () {
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
