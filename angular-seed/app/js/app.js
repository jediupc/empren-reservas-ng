'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'listaCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'DatepickerDemoCtrl'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
