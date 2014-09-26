'use strict';

angular.module('openeyesApp')
  .factory('Dates', [function() {
    return {
      getAge: function(dateStr){
        var age = new Date(
          Date.now() - new Date(dateStr).getTime()
        );
        return Math.abs(age.getUTCFullYear() - 1970);
      }
    };
  }]);
