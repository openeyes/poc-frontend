'use strict';

angular.module('openeyesApp')
  .controller('InjectionQuestionsCtrl', ['$scope', '$attrs', '$parse', 'Conditions', 'Event', function($scope, $attrs, $parse, Conditions, Event){

    var self = this;

    this.init = function(attr){

      this.eyeSide = $attrs.side;

      $scope.model = {};

      //  Listen for save event
      //  Broadcast by event page controller
      $scope.$on('event.save', this.broadcastModel);

      $scope.$watchCollection('[diagnosis,secondaryToDiagnosis]', function(collection) {
        // At the least, we need a diagnosis, but secondaryToDiagnosis is optional.
        if (collection[0]) {
          self.getQuestions();
        }
      });
    };

    this.getQuestions = function() {

      var diagnosisId = $scope.diagnosis.id;
      var secondaryToDiagnosisId = $scope.secondaryToDiagnosis ? $scope.secondaryToDiagnosis.id : null;

      Conditions.getInjectionQuestions(diagnosisId, secondaryToDiagnosisId)
        .then(function(data) {
          $scope.questions = data;
        }, function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'injectionQuestions',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };

  }])
  .directive('injectionQuestions', [function () {

    return {
      restrict: 'E',
      scope: {
        diagnosis: '=',
        secondaryToDiagnosis: '='
      },
      templateUrl: 'views/directives/injectionQuestions.html',
      controller: 'InjectionQuestionsCtrl',
      link: function ($scope, element, attr, InjectionQuestionsCtrl) {
        InjectionQuestionsCtrl.init(attr);
      }
    };
  }]);
