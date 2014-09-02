'use strict';

angular.module('openeyesApp')
	.directive('lasersite', function (Sites) {

		var ctrl = function($scope){
			$scope.siteSelected = function(){
				// Populate laser dropdown for this site
				Sites.getLasersForSite($scope.selectedSite.id)
	      .success(function(data) {
					$scope.lasers = data;
	      })
	      .error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
		    });
			};

			$scope.laserSelected = function(){};
		};

		return {
			restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
			scope: {},
			templateUrl: 'scripts/templates/lasersite.html',
			controller: ctrl, //Embed a custom controller in the directive
			link: function ($scope) {
				//	On creation populate sites dropdown
				Sites.getSites()
		      .success(function(data) {
						$scope.sites = data;
		      })
		      .error(function(data, status, headers, config) {
						console.log(data, status, headers, config);
			    });

			  Sites.getLaserOperators()
					.success(function(data) {
						$scope.operators = data;
		      })
		      .error(function(data, status, headers, config) {
						console.log(data, status, headers, config);
			    });
			}
		};
	});