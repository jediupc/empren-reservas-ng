angular.module('reservas')
	
	.controller("areasCtrl", function($scope,$rootScope, apiService, $modal) {
		apiService.getEspais();


		$scope.es_admin = function() {
			return apiService.es_admin();
		};

		$scope.openDeleteEspaiModal = function(idToDelete) {

				var size = 300;
				var modalInstance = $modal.open({
					templateUrl: 'modals/deleteEspaiModal.html',
					controller: 'deleteEspaiModalController',
					size: size
				});

				modalInstance.result.then(function () {
					//Ok, esborra reserva

					apiService.deleteEspai(idToDelete).then(function(data) {
						$rootScope.espais = apiService.model.espais;

					}, function() {

					});
				}, function () {
					//Cancel
				});
			};

	});