'use strict';

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
    },
    'posteriorPole': {
      doodles: [
        'NuclearCataract'
      ]
    }
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

      this[attr.mode]();
    };



    this.view = function(){
      // Force wait till next digest incase data isn't available yet
      $timeout(function() {
        EyeDraw.init($scope.options);
      });
    };

    this.edit = function(){
      if (!$scope.model) {
        $scope.model = '[]';
      }
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
      scope: {
        model: '=?ngModel'
      },
      replace: true,
      restrict: 'AE',
      controller: 'EyeDrawCtrl',
      templateUrl: 'views/directives/eyedraw.html',
      link: link
    };
  }]);
