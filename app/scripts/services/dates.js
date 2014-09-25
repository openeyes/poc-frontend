'use strict';

angular.module('openeyesApp')
  .factory('Dates', [function() {

    function pad(char, val) {
      return (char + String(val)).slice(-char.length);
    }

    return {
      getAge: function(timestamp){
        var dobTime = new Date(timestamp).getTime();
        // This is not exactly precise.
        var age = (Date.now() - dobTime) / (1000 * 60 * 60 * 24 * 365.26);
        return age.toFixed(0);
      },
      getFormattedTime: function(timestamp) {

        var d = new Date(timestamp);
        var hours = d.getHours();
        var minutes = d.getMinutes();

        return hours + ':' + pad('00', minutes);
      }
    };

  }]);
