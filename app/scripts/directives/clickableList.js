'use strict';

angular.module('openeyesApp')
  .controller('ClickableListCtrl', ['$scope',function($scope){

    var self = this;

    this.init = function(element){
      //set item to closed
      this.element = element;

      // //set closed background class
      // $(element).find('.detail-txt').hide();
      $(element).addClass('closed');
      $(element).addClass('clickable');

      //toggle event handler on click to show and change icon
      $(element).click(function() {
        $( this ).toggleClass( 'closed');
      });

    };
  }])
  .directive('oeClickableList', [function() {
    return {
      scope: {},
      restrict: 'A',
      controller: 'ClickableListCtrl',
      link: function($scope, element, attr, ClickableListCtrl) {
        ClickableListCtrl.init(element);
      }
    };
  }]);
