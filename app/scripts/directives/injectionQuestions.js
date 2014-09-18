'use strict';

angular.module('openeyesApp')
  .controller('InjectionQuestionsCtrl', ['$scope', '$attrs', '$parse', 'InjectionManagement', function($scope, $attrs, $parse, InjectionManagement){

    var self = this;

    this.init = function(){

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

      InjectionManagement.getInjectionQuestions(diagnosisId, secondaryToDiagnosisId)
        .then(function(data) {
          $scope.questions = data;
        }, function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });
    };
  }])
  .directive('oeInjectionQuestions', [function () {

    return {
      restrict: 'E',
      scope: {
        model: '=?ngModel',
        diagnosis: '=',
        secondaryToDiagnosis: '='
      },
      templateUrl: 'views/directives/injectionQuestions.html',
      controller: 'InjectionQuestionsCtrl',
      link: function ($scope, element, attr, InjectionQuestionsCtrl) {
        InjectionQuestionsCtrl.init();
      }
    };
  }]);
