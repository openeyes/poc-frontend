"use strict";

 angular.module('config', [])

.constant('ENV', {name:'dev',host:'http://localhost:9000',apiEndpoints:{patients:'/data/patients.json',patient:'/data/patient-<id>.json'}})

;