angular.module('reservas')
	.controller("mainCtrl", function($scope,$rootScope, $state, apiService, $modal) {
		apiService.tryLogin().then(function() {
			$scope.model = apiService.model;

			$scope.user_name = apiService.model.user.nom_usuari;
			$scope.logOff = function() {
				apiService.logOff();
			};

			$scope.es_admin = function() {
				return apiService.es_admin();
			};

			$scope.openNewUserModal = function() {
				$modal.open({
					templateUrl: 'modals/newUserModal.html',
					controller:'newUserModalController',
					size: 300
				});
			};

			$scope.openNewEspaiModal = function() {
				$modal.open({
					templateUrl: 'modals/newEspaiModal.html',
					controller:'newEspaiModalController',
					size: 300
				})
			};

			//Load automatically when enter.
			apiService.getEspais().then(function(dat) {
				$rootScope.espais = apiService.model.espais;
			});
		}, function(){

		});

	});