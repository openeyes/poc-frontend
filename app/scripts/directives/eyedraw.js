'use strict';

angular.module('openeyesApp')
  .factory('EyeDraw', ['$window', function($window){
    return $window.ED;
  }])
  .constant('eyedrawOptions', {
    'default': {
      scale: 1,
      focus: false,
      graphicsPath: '/eyedraw/img/',
      offsetX: 0,
      offsetY: 0,
      toImage: false
    },
    'anterior': {
      doodles: [
        [
          'NuclearCataract',
          'CorticalCataract',
          'PostSubcapCataract',
          'PCIOL',
          'ACIOL',
          'Bleb',
          'PI',
          'Label'
        ]
      ],
      onReadyCommandArray: [
        ['addDoodle', ['AntSeg']],
        ['deselectDoodles', []]
      ]
    },
    'posterior': {
      doodles: [
        [
          'HardDrusen',
          'Geographic',
          'CNV',
          'RPEDetachment',
          'EpiretinalMembrane',
          'MacularHole',
          'MacularDystrophy',
          'Macroaneurysm',
          'RetinalVeinOcclusionPostPole',
          'RetinalArteryOcclusionPostPole'
        ],
        [
          'Microaneurysm',
          'BlotHaemorrhage',
          'HardExudate',
          'IRMA',
          'Circinate',
          'MacularThickening',
          'CystoidMacularOedema',
          'PreRetinalHaemorrhage',
          'CottonWoolSpot',
          'DiabeticNV',
          'VitreousOpacity',
          'FibrousProliferation',
          'TractionRetinalDetachment'
        ],
        [
          'SwollenDisc',
          'Telangiectasis',
          'ChoroidalHaemorrhage',
          'ChoroidalNaevus'
        ],
        [
          'LaserSpot',
          'FocalLaser',
          'MacularGrid',
          'SectorPRPPostPole',
          'PRPPostPole',
          'Label'
        ]
      ],
      onReadyCommandArray: [
        ['addDoodle',['PostPole']],
        ['deselectDoodles', []]
      ]
    },
    'injectionSite': {
      scale: 0.5,
      doodles: [
        [
          'InjectionSite',
          'Label'
        ]
      ],
      onReadyCommandArray: [
        ['addDoodle',['AntSeg']],
        ['addDoodle',['InjectionSite']],
        ['deselectDoodles',[]]
      ]
    }
  })
  .controller('EyeDrawCtrl', ['$scope', '$timeout', 'Event', 'EyeDraw', 'eyedrawOptions', function($scope, $timeout, Event, EyeDraw, eyedrawOptions){

    this.init = function(attr, id){

      if (!attr.mode) {
        console.warn('EyeDraw: mode not set');
        return;
      }

      $scope.side = attr.side;
      $scope.mode = attr.mode;

      var options = eyedrawOptions[attr.options];
      if (!options) {
        console.warn('EyeDraw: Options not found for', attr.options);
        return;
      }

      $scope.options = this.getOptions(id, options);
      $scope.getTitle = function getTitle(className) {
        return EyeDraw.titles[className];
      };

      this[attr.mode]();
    };

    this.view = function(){
      // Force wait till next digest incase data isn't available yet
      $timeout(function() {
        EyeDraw.init($scope.options);
      }, 2000);
    };

    this.edit = function(){
      if (!$scope.model) {
        $scope.model = '[]';
      }
      // Only initiate the eyedraw once the $scope has been applied.
      // This is necessary as we're generating required scope vars in the same event loop.
      $timeout(function() {
        EyeDraw.init($scope.options, function(instance) {
          $scope.instance = instance;
        });
      });
    };

    this.getOptions = function(id, options){
      return angular.extend({
        eye: ($scope.side === 'rightEye' ? 0 : 1),
        isEditable: ($scope.mode === 'edit'),
        canvasId: 'canvas-id-'+id,
        inputId: 'input-id-'+id,
        drawingName: 'drawing-name-'+id
      }, eyedrawOptions.default, options);
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
        model: '=?ngModel',
        instance: '=?'
      },
      replace: true,
      restrict: 'AE',
      controller: 'EyeDrawCtrl',
      templateUrl: 'views/directives/eyedraw.html',
      link: link
    };
  }]);
