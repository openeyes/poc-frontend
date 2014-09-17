'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.directive:eyedraw

 * @description
 * This EyeDraw directive will handle the initiation of an eyedraw instance and
 * accepts the following attributes:
 *
 * data:    The data model used for storing eyedraw data
 * options: key:value options for the eyedraw lib
 * mode:    "edit" or "view"
 *
 * If the "mode" is set to "view" then data is required to initiate the eyedraw.
 *
 * @example
 * <div ng-init="data=[]">
 *   <eyedraw data="data" options='{"doodles": ["NuclearCataract"]}' mode="edit"></eyedraw>
 * </div>
 */


angular.module('openeyesApp')
  .factory('EyeDraw', ['$window', function($window){
    return $window.ED;
  }])
  .constant('eyedrawOptions', {
    'core': {
      scale: 1,
      focus: false,
      graphicsPath: '/eyedraw/img/',
      offsetX: 0,
      offsetY: 0,
      toImage: false
    },
    'anterior': {
      doodles: [
        'NuclearCataract',
        'CorticalCataract',
        'PostSubcapCataract',
        'PCIOL',
        'ACIOL',
        'Bleb',
        'PI',
        'Label'
      ],
      onReadyCommandArray: [
        ['addDoodle', ['AntSeg']],
        ['deselectDoodles', []]
      ]
    }
  })
  .constant('eyedrawOptionsAnterior', {

  })
  .controller('EyeDrawCtrl', ['$scope', '$timeout', 'Event', 'EyeDraw', 'eyedrawOptions', function($scope, $timeout, Event, EyeDraw, eyedrawOptions){

    var self = this;

    this.init = function(attr, id){

      this.eyeSide = attr.side;
      this.attr = attr;
      $scope.mode = attr.mode;
      $scope.options = this.getOptions(id, eyedrawOptions[attr.options]);
      $scope.getTitle = function getTitle(className) {
        return EyeDraw.titles[className];
      };

      //  Listen for save event
      //  Broadcast by event page controller
      $scope.$on('event.save', this.broadcastModel);

      this[attr.mode]();
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'eyedraw',
        subPath: this.eyeSide,
        model: {
          anteriorSegment: {
            'data': $scope.data
          }
        }
      };
    };

    this.view = function(){
      // Force wait till next digest incase data isn't available yet
      $timeout(function() {
        if(self.attr.data){
          $scope.data = self.attr.data;
          EyeDraw.init($scope.options);
        } else {
          self.view();
        }
      });
    };

    this.edit = function(){
      // In edit mode data is empty to begin with
      $scope.data = '[]';
      // Only initiate the eyedraw once the $scope has been applied.
      // This is necessary as we're generating required scope vars in the same event loop.
      $timeout(function() {
        EyeDraw.init($scope.options);
      });
    };

    this.getOptions = function(id, options){
      return angular.extend({
        isEditable: ($scope.mode === 'edit'),
        canvasId: 'canvas-id-'+id,
        inputId: 'input-id-'+id,
        drawingName: 'drawing-name-'+id
      }, eyedrawOptions.core, options);
    };

  }])
  .directive('oeEyedraw', [function() {

    var id = 0;
    function link($scope, element, attr, EyeDrawCtrl) {
      id++;
      EyeDrawCtrl.init(attr, id);
    }

    return {
      scope: {},
      replace: true,
      restrict: 'AE',
      controller: 'EyeDrawCtrl',
      templateUrl: 'views/directives/eyedraw.html',
      link: link
    };
  }]);
