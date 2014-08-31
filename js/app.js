angular.module("reservas", ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('loading', {
        url: '/loading',
        templateUrl: '../html/loading.html',
        onEnter: function(apiService) {
            apiService.login('admin', 'admin');
        }})

    .state('root', {
        url: '/root',
        templateUrl: '../html/root.html'})

    .state('index', {
        url: '/index',
        templateUrl: '../html/index.html'})

    .state('main', {
        url: '/main',
        templateUrl: '../html/main.html'})

    .state('areas', {
        url: '/areas',
        templateUrl: '../html/areas.html'})

    .state('reservas', {
        url: '/reservas',
        templateUrl: '../html/reservas.html'})

    $urlRouterProvider.otherwise('/loading');
})