/**
 * Created by alberto on 2/2/15.
 */
angular.module('reservas').controller('accountController', function($scope, apiService) {
  apiService.tryLogin().then(function(){
    $scope.user = apiService.model.user;
    $scope.data = {
      oldPassword : "",
      newPassword: "",
      repeatNewPassword: ""
    };

    $scope.successText = '';
    $scope.errorText = '';

    $scope.cambiarContrasenya = function() {
      if($scope.data.newPassword === $scope.data.repeatNewPassword) {
        apiService.cambiaContrasenya($scope.data.oldPassword, $scope.data.newPassword).then(function(){

          $scope.successText = 'Contrasenya cambiada amb èxit!';
          $scope.data.oldPassword = '';
          $scope.data.newPassword = '';
          $scope.data.repeatNewPassword = '';

        }, function(err){
          if(err.status === 495) {
            $scope.errorText = 'La contrasenya antiga no es correcta';
            $scope.successText = '';
          } else if(err.status === 496) {
            $scope.errorText = 'La contrasenya ha de ser de mínim 8 caràcters';
            $scope.successText = '';
          } else {
            $scope.errorText = 'No hem pogut cambiar el password';
            $scope.successText = '';
          }

        })
      } else {
        $scope.errorText = 'Les contrasenyes no coincideixen';
        $scope.successText = '';
      }
    };


  }, function(){

  });
});