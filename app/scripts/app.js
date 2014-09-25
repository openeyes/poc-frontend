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
  .config(['$routeProvider', '$httpProvider', 'ENV', function ($routeProvider, $httpProvider, ENV) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
      .when('/patient/:patientId/event/:eventType/create', {
        templateUrl: 'views/event-create.html',
        controller: 'EventCtrl'
      })
      .when('/patient/:workflowId/:ticketId/:stepIndex', {
        templateUrl: 'views/event-create.html',
        controller: 'EventCtrl'
      })
      .when('/patient/:patientId/event/:eventId', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl'
      })
      .when('/forms', {
        templateUrl: 'views/forms.html',
        controller: 'FormsCtrl'
      })
      .when('/patients/:workflowId/:stepIndex', {
        templateUrl: 'views/patients.html',
        controller: 'PatientsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // To allow CORS and ajax with http auth
    if(ENV.name === 'dist') {
      $httpProvider.defaults.withCredentials = true;
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

  }])
  .constant('MODEL_DOMAIN', 'org.openeyes.api.models.')
  .constant('WORKFLOW_DOMAIN', 'org.openeyes.api.models.workflow');
