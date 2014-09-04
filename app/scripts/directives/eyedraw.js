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
	.factory('EyeDraw', function($window){
		return $window.ED;
	})
	.constant('eyedrawOptions', {
		scale: 1,
		focus: false,
		graphicsPath: '/eyedraw/img/',
		offsetX: 0,
		offsetY: 0,
		toImage: false
	})
	.directive('eyedraw', function(EyeDraw, eyedrawOptions, $timeout) {

		var init = {
			// Initiate the eyedraw in view mode.
			view: function($scope) {
				// Only initiate the eyedraw once we have some data.
				var unbindWatcher = $scope.$watch('data', function(data) {
					if (data && data.length) {
						EyeDraw.init($scope.options);
						unbindWatcher();
					}
				});
			},
			// Initiate the eyedraw in edit mode.
			edit: function($scope) {
				// Only initiate the eyedraw once the $scope has been applied.
				// This is necessary as we're generating required scope vars in the same event loop.
				$timeout(function() {
					EyeDraw.init($scope.options);
				});
			}
		};

		var id = 0;

		function getOptions($scope, options) {
			id++;
			return angular.extend({
				isEditable: ($scope.mode === 'edit'),
				canvasId: 'canvas-id-'+id,
				inputId: 'input-id-'+id,
				drawingName: 'drawing-name-'+id
			}, eyedrawOptions, options);
		}

		function link($scope, element, attr) {

			$scope.mode = attr.mode;
			$scope.options = getOptions($scope, $scope.$eval(attr.options));
			$scope.getTitle = function getTitle(className) {
				return EyeDraw.titles[className];
			};

			init[attr.mode]($scope);
		}

		return {
			scope: {
				data: '=data',
			},
			replace: true,
			restrict: 'AE',
			templateUrl: 'views/directives/eyedraw.html',
			link: link
		};
	});
