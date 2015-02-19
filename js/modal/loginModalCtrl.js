/**
 * Created by alberto on 28/1/15.
 */
angular.module("reservas").controller("loginModalController", function($scope, $modalInstance, $state, apiService){

  $scope.data = {
    username: '',
    password: ''
  };

  $scope.error = '';

  $scope.login = function () {
    apiService.login($scope.data.username, $scope.data.password).then(function(){
      $modalInstance.close();
      $state.go('main.areas');
    }, function(err) {
      if(err.status === 401) {
        $scope.error = "Usuari o contrasenya incorrectes";
      }
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
