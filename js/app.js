angular.module("reservas", ['ui.router', 'ngCookies', 'ui.bootstrap'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '/root',
        templateUrl: '../html/root.html',
        onEnter: function (apiService, $state) {

          /*apiService.login("admin", "admin").then(function(){
            $state.go('main.areas');
          }, function() {

          });*/

          apiService.tryLogin().then(function() {
            $state.go('main.areas');
          }, function(){

          });
        }
      })

      .state('index', {
        url: '/index',
        templateUrl: '../html/index.html',
        controller: 'indexCtrl',
        onEnter: function (apiService, $state) {
          apiService.tryLogin().then(function() {
            $state.go('main.areas');
          }, function() {

          })
        }
      })

      .state('main', {
        url: '/main',
        templateUrl: '../html/main.html',
        controller: 'mainCtrl',
        abstract:true
      })
      .state('main.account', {
        url: '/account',
        templateUrl: '../html/account.html',
        controller: 'accountController'
      })
      .state('main.areas', {
        url: '/areas',
        templateUrl: '../html/areas.html',
        controller: 'areasCtrl'
      })

      .state('main.reservas', {
        url: '/reservas',
        controller: 'reservasCtrl',
        templateUrl: '../html/reservas.html'
      })

      .state('main.calendar', {
        url: '/{espai_id}/calendar/{espai_nom}',
        templateUrl: '../html/calendar.html',
        controller: 'calendarCtrl'
      });
    $urlRouterProvider.otherwise('/index');
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