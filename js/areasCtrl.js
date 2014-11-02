angular.module('reservas')
	
	.controller("areasCtrl", function($scope, apiService) {
		
		apiService.getEspais().then(function(data) {
		
			$scope.json_data = data;
		
		})

	});