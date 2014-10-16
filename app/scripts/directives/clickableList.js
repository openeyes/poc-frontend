'use strict';

angular.module('openeyesApp')
  .controller('ClickableListCtrl', ['$scope',function($scope){

    this.init = function(element){
      //set item to closed
      this.element = element;
      $(element).addClass('closed');
      $(element).addClass('clickable');

      $scope.toggleClose = function($event){
        $( $event.target ).toggleClass( 'closed');
      };
    };
  }])
  .directive('oeClickableList', [function() {
    return {
      restrict: 'A',
      controller: 'ClickableListCtrl',
      link: function($scope, element, attr, ClickableListCtrl) {
        ClickableListCtrl.init(element);
      }
    };
  }]);
