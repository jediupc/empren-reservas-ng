/**
 * Created by alberto on 28/1/15.
 */

angular.module('reservas').controller('newEspaiModalController', function($rootScope, $scope, $timeout, $modalInstance, apiService) {

  $scope.textSuccess = '';
  $scope.textError = '';
  $scope.createEspai = function(nom, descripcio) {
    apiService.createEspai(nom, descripcio).then(function(data) {
      $rootScope.espais = apiService.model.espais;
      $scope.textSuccess = 'Espai creat amb èxit!';
      $timeout(function(){
        $modalInstance.close();
      }, 2000);
    }, function(err) {

    });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
});
