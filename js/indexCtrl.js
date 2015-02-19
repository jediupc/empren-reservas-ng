angular.module('reservas')
	.controller("indexCtrl", function($scope, $state, $modal) {
		
		$scope.username = "";
		$scope.password = "";

		$scope.openLoginModal = function() {
			$modal.open({
				templateUrl: 'modals/loginModal.html',
				controller: 'loginModalController',
				size: 300
			});
		}

	});