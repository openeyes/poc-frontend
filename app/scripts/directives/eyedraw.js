'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.directive:eyedraw
 * @description
 * # EventCtrl
 * EyeDraw directive
 */

angular.module('openeyesApp')
	.directive('eyedraw', function() {

		var c = 0;
		var defaultOptions = {
			scale: 1,
			toggleScale: 0,
			idSuffix: '',
			isEditable: false,
			focus: false,
			graphicsPath: '/eyedraw/img/',
			offsetX: 0,
			offsetY: 0,
			toImage: false
		};

		var init = {
			// Initiate the eyedraw in view mode.
			view: function($scope, options) {
				var hasInit = false;
				// Only initiate the eyedraw once we have some data.
				$scope.$watch('data', function() {
					var hasData = ($scope.data && $scope.data.length);
					if (hasData && !hasInit) {
						hasInit = true;
						window.ED.init(options);
					}
				});
			},
			// Initiate the eyedraw in edit mode.
			edit: function($scope, options) {
				// Only initiate the eyedraw once the $scope has been applied.
				// We could alternatively use $scope.$apply() to immediately compile the template.
				$scope.$watch('canvasId', function() {
					window.ED.init(options);
				}, true);
			}
		};

		function link($scope, element, attr) {

			var id = ++c;

			$scope.canvasId = 'canvas-id-'+id;
			$scope.inputId = 'input-id-'+id;
			$scope.drawingName = 'drawing-name-'+id;
			$scope.mode = attr.mode;

			var options = angular.extend({}, defaultOptions, $scope.options, {
				isEditable: (attr.mode === 'edit'),
				canvasId: $scope.canvasId,
				inputId: $scope.inputId,
				drawingName: $scope.drawingName,
			});

			init[attr.mode]($scope, options);
		}

		return {
			scope: {
				data: '=ngModel',
				options: '=options'
			},
			replace: true,
			restrict: 'AE',
			templateUrl: 'views/directives/eyedraw.html',
			link: link
		};
	});
