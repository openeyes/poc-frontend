'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Patient
 * @description
 * # Patient
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Patient', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    console.log(ENV);

    return {

      getExistingAllergies: function(patientId){
        console.log(patientId);

        var data = [
          {name: 'Atropine', comment: ''},
          {name: 'Fluorescin', comment: ''}
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },

      getPatientsForStep: function(step) {

        var data = [
          {
            "_id": {
              "$oid": "540d66fcba888041f2c2949b"
            },
            "id": "10001",
            "firstName": "Chay",
            "surname": "Close",
            "dob": "1920-11-02",
            "gender": "Female",
            "ethnicity": "Unknown",
            "contactDetail": {
              "telephone": "04130 4541610"
            },
            "nhsNumber": "348 769 5836",
            "nextOfKin": "",
            "generalPractitioner": {},
            "hospitalNumber": "1000001"
          },
          {
            "_id": {
              "$oid": "540d66fcba888041f2c2949c"
            },
            "id": "10002",
            "firstName": "Paula",
            "surname": "Beck",
            "dob": "1978-06-03",
            "gender": "Female",
            "ethnicity": "Unknown",
            "contactDetail": {
              "email": "Paula.Beck@hotmail.com",
              "telephone": "01344 3757123"
            },
            "address": {
              "addressLine1": "110, Michaelson Avenue",
              "addressLine2": "Llanidloes",
              "city": "Ardgay",
              "county": "",
              "postcode": "AP79 1XI"
            },
            "nhsNumber": "835 436 4391",
            "nextOfKin": "",
            "generalPractitioner": {},
            "hospitalNumber": "1000002"
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };
  }]);
