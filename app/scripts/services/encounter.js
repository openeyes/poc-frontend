'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Encounter
 * @description
 * # Encounter
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Encounter', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    var form;

    return {
      elements: [],
      setForm: function(f) {
        form = f;
      },
      getForm: function() {
        return form;
      },
      create: function(body){
        var apiCall = ENV.host + ENV.apiEndpoints.createEncounter;
        return $http({
          method: 'POST',
          url: apiCall,
          data: body
        });
      },
      addElement: function(data){
        this.elements.push(data);
      },
      getElements: function(){
        return this.elements;
      },
      clearElements: function(){
        this.elements = [];
      }
    };

  }]);
