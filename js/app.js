angular.module("reservas", ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'login.html'})

    .state('areas', {
        url: '/areas',
        templateUrl: 'areas.html'})

    .state('reservas', {
        url: '/reservas',
        templateUrl: 'reservas.html'})
})