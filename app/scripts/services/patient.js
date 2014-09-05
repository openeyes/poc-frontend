'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:patient
 * @description
 * # patientService
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.factory('Patient', function($resource) {
		return $resource('/api/entries/:id'); // Note the full endpoint address
	});