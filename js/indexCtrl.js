angular.module('reservas')
	.controller("indexCtrl", function($scope, apiService) {
		
		/*$scope.name = "";
		$scope.surname = "";*/
		$scope.username = "";
		$scope.password = "";

		/*console.log($scope.name);
		console.log($scope.surname);*/
		console.log($scope.username);
		console.log($scope.password);

		$scope.login = function(user, password) {
			apiService.login(user,password);
		}

		$scope.createUser = function(user, password, name, surname) {
			apiService.createUser(user, password, name, surname);
		}

	});