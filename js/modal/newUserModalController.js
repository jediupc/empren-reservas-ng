/**
 * Created by alberto on 28/1/15.
 */

angular.module('reservas').controller('newUserModalController', function($rootScope,  $scope, $timeout, $modalInstance, apiService) {

  $scope.textSuccess = '';
  $scope.textError = '';
  $scope.createUser = function(user, password, name, surname) {
    apiService.createUser(user, password, name, surname).then(function(){
      $scope.textSuccess = 'Usuari creat amb èxit!';
      $timeout(function(){
        $modalInstance.close();
      }, 2000);
    }, function(err){

    });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
});