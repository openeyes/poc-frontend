"use strict";

 angular.module('config', [])

.constant('ENV', {name:'dist',host:'http://openeyes:Aeno8aiKu0ih@openeyes-api-uat.headlondon.com',apiEndpoints:{patients:'/Patient/?searchTerm=:term',patient:'/Patient/:id',sites:'/Site',siteLasers:'/Laser/?siteId=:id',laserOperators:'/LaserOperator',patientEvents:'/LaserEvent/?patientId=:id',laserEvent:'/LaserEvent/:id',createLaserEvent:'/LaserEvent',procedures:'/Procedure'}})

;