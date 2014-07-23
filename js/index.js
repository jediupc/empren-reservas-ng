angular.module("index", ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'login.html'})
})