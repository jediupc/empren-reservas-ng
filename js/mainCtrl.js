angular.module('reservas')
	.controller("mainCtrl", function($scope, apiService) {

		$scope.logOff = function() {
			apiService.logOff();
		}

	});