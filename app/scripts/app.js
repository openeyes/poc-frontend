'use strict';

/**
 * @ngdoc overview
 * @name openeyesApp
 * @description
 * # openeyesApp
 *
 * Main module of the application.
 */
angular
	.module('openeyesApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				redirectTo: '/search'
			})
			.when('/search', {
				templateUrl: 'views/search.html',
				controller: 'SearchCtrl'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl'
			})
			.when('/two-col', {
				templateUrl: 'views/two-col.html',
				controller: 'TwoColCtrl'
			})
			.otherwise({
				redirectTo: '/search'
			});
	});
