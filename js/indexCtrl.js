angular.module('reservas')
	.controller("indexCtrl", function($scope, apiService) {
		
		$scope.username = "";
		$scope.password = "";

		$scope.login = function(user, password) {
			apiService.login(user,password);
		}

	});