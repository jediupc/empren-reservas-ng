/**
 * Created by alberto on 1/2/15.
 */
angular.module("reservas").controller('deleteEspaiModalController', function ($scope, $modalInstance) {

  $scope.eliminar = function () {
    $modalInstance.close();
  };

  $scope.cancelar = function () {
    $modalInstance.dismiss('cancel');
  };
});