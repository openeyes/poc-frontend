'use strict';

angular.module('openeyesApp')
  .controller('TreatmentOrderCtrl', ['$scope', '$attrs', 'Treatment', 'Event', function($scope, $attrs, Treatment, Event){

    this.init = function(attrs){

      $scope.side = $attrs.side;
      $scope.model = {};

      //  Listen for save event
      //  Broadcast by event page controller
      $scope.$on('event.save', this.broadcastModel);

      $scope.$watch('injectionPersonnel', function(people) {
        if (people instanceof Array) {
          // Default to first person.
          $scope.model.injectionPerson = people[0];
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
      return {
        name: 'TreatmentOrder',
        subPath: $scope.side,
        model: $scope.model
      };
    };

  }])
  .directive('oeTreatmentOrder', [function () {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'views/directives/treatmentOrder.html',
      controller: 'TreatmentOrderCtrl',
      link: function (scope, element, attrs, TreatmentOrderCtrl) {
        TreatmentOrderCtrl.init(attrs);
      }
    };
  }]);
