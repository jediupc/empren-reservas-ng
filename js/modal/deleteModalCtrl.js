/**
 * Created by alberto on 24/1/15.
 */
/**
 * Created by alberto on 19/1/15.
 */
angular.module("reservas").controller('deleteModalController', function ($scope, $modalInstance) {

  $scope.eliminar = function () {
    $modalInstance.close();
  };

  $scope.cancelar = function () {
    $modalInstance.dismiss('cancel');
  };
});