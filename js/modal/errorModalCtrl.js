/**
 * Created by alberto on 19/1/15.
 */
angular.module("reservas").controller('errorModalController', function ($scope, $modalInstance, text) {

  $scope.texto = text;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});