'use strict';

angular.module('openeyesApp')
  .factory('Dates', [function() {

    function pad(char, val) {
      return (char + String(val)).slice(-char.length);
    }

    return {
      getAge: function(dateStr){
        var age = new Date(
          Date.now() - new Date(dateStr).getTime()
        );
        return Math.abs(age.getUTCFullYear() - 1970);
      }

    };

  }]);
