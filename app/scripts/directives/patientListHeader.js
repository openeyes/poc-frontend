'use strict';

angular.module('openeyesApp')
  .controller('PatientListHeaderCtrl', [function(){
    this.init = function(element){
      element.affix({
        offset: { top: 48 }
      });

      element.on('affixed.bs.affix', function(){
        element.siblings().addClass('affix-containers');
      });

      element.on('affixed-top.bs.affix', function(){
        element.siblings().removeClass('affix-containers');
      });
    };
  }])
  .directive('oePatientListHeader', [function() {
    return {
      scope: {},
      restrict: 'A',
      controller: 'PatientListHeaderCtrl',
      link: function($scope, element, attr, PatientListHeaderCtrl) {
        PatientListHeaderCtrl.init(element);
      }
    };
  }]);
