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
			eye: 1,
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
	.controller('EyeDrawCtrl', ['$scope', '$timeout', 'EyeDraw', 'eyedrawOptions', function($scope, $timeout, EyeDraw, eyedrawOptions){

		this.init = function(attr, id){

			$scope.mode = attr.mode;
			$scope.options = this.getOptions(id, eyedrawOptions[attr.options]);


			$scope.getTitle = function getTitle(className) {
				return EyeDraw.titles[className];
			};

			this[attr.mode]();
		};

		this.view = function(){
			var unbindWatcher = $scope.$watch('data', function(data) {
				if (data && data.length) {
					EyeDraw.init($scope.options);
					unbindWatcher();
				}
			});
		};

		this.edit = function(){
			// Only initiate the eyedraw once the $scope has been applied.
			// This is necessary as we're generating required scope vars in the same event loop.
			$timeout(function() {
				console.log($scope.options);				
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
	.directive('eyedraw', [function() {
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
