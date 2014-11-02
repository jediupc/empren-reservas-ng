angular.module('reservas')
	.controller("mainCtrl", function($scope, apiService) {

		$scope.name = "";
		$scope.surname = "";
		$scope.username = "";
		$scope.password = "";

		$scope.logOff = function() {
			apiService.logOff();
		}

		$scope.createUser = function(user, password, name, surname) {
			apiService.createUser(user, password, name, surname);
		}

	});