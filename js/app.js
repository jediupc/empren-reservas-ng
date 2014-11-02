angular.module("reservas", ['ui.router', 'ngCookies'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('root', {
        url: '/root',
        templateUrl: '../html/root.html',
        onEnter: function(apiService) {
          apiService.tryLogin();
        }})

    .state('index', {
        url: '/index',
        templateUrl: '../html/index.html',
        controller: 'indexCtrl'})

    .state('main', {
        url: '/main',
        templateUrl: '../html/main.html',
        controller: 'mainCtrl'
        })

    .state('main.areas', {
        url: '/areas',
        templateUrl: '../html/areas.html',
        controller: 'areasCtrl'})

    .state('main.reservas', {
        url: '/reservas',
        templateUrl: '../html/reservas.html'});

    $urlRouterProvider.otherwise('/root');
});

/*
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
  $routeProvider.when('/view1', {
    templateUrl: 'partials/partial1.html', 
    controller: 'listaCtrl'});

  $routeProvider.when('/reservas', {
    templateUrl: 'partials/partial2.html', 
    controller: 'DatepickerDemoCtrl'});

  $routeProvider.otherwise( {
    redirectTo: '/reservas'});
}]);*/