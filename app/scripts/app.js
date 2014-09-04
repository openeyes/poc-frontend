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
    'ngTouch',
    'localytics.directives',
    'config'
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
      .when('/patient/:patientId', {
        templateUrl: 'views/patient.html',
        controller: 'PatientCtrl'
      })
      .when('/patient/:patientId/event/create', {
        templateUrl: 'views/event-create.html',
        controller: 'EventCtrl'
      })
      .when('/patient/:patientId/event/:eventId', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl'
      })
      .otherwise({
        redirectTo: '/search'
      });
  });
