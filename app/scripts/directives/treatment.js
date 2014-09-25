'use strict';

angular.module('openeyesApp')
  .controller('TreatmentCtrl', ['$scope', '$attrs', 'Treatment', 'Event', 'MODEL_DOMAIN', function($scope, $attrs, Treatment, Event, MODEL_DOMAIN){

    var self = this;

    this.init = function(attrs){

      $scope.side = attrs.side;
      $scope.model = {};

      //  Listen for save event
      //  Broadcast by event page controller
      $scope.$on('event.save', this.broadcastModel);

      $scope.$watch('injectionPersonnel', function(people) {
        if (people instanceof Array) {
          // Default to first person.
          $scope.injectionGivenBy = people[0];
        }
      });

      Treatment.getInjectionPersonnel()
        .then(function(data){
          $scope.injectionPersonnel = data;
        }, function(error){
          console.log(error);
        });
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){

      if($scope.injectionGivenBy){
        $scope.model.injectionGivenBy = $scope.injectionGivenBy.label;
      }

      return {
        name: MODEL_DOMAIN + 'Treatment',
        subPath: $scope.side,
        model: $scope.model
      };
    };

  }])
  .directive('oeTreatment', [function () {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'views/directives/treatment.html',
      controller: 'TreatmentCtrl',
      link: function (scope, element, attrs, TreatmentCtrl) {
        TreatmentCtrl.init(attrs);
      }
    };
  }]);
