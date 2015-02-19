/**
 * Created by alberto on 24/1/15.
 */

angular.module('reservas').controller('reservasCtrl', function($scope, apiService, $modal){

  $scope.model = apiService.model;
  //GET de les reserves
  $scope.reservas = [];

  $scope.getReservas = function() {

    var data_avui = new Date();
    var inici = parseDateReserva(6, data_avui.getUTCDate(), data_avui.getUTCMonth()+1, data_avui.getFullYear());

    apiService.getReservas(null, inici).then(function(data){

      $scope.reservas.length = 0;

      var arr = data.data;
      for(var i = 0; i < arr.length; ++i) {
        var date = new Date(new Date(arr[i].data_hora));
        if(arr[i].usuari !== null) {
          $scope.reservas.push({
            data: date,
            hora: date.getUTCHours(),
            usuari: arr[i].usuari.nom,
            espai: arr[i].espai.codi,
            _id: arr[i]._id
          })
        }

      }
    }, function(){

    });
  };

  $scope.getReservas();

  //Auxiliar functions

  function parseSingleNum(num) {
    if(num <= 9) {
      return "0" + num;
    } else {
      return num.toString();
    }
  }

  function parseDateReserva (hora, dia, mes, any) {
    return "" + any + parseSingleNum(mes) + parseSingleNum(dia) + parseSingleNum(hora);
  }

  //Modal DELETE
  $scope.openDeleteModal = function (idToDelete) {

    console.log(idToDelete);

    var size = 300;
    var modalInstance = $modal.open({
      templateUrl: 'modals/deleteModal.html',
      controller: 'deleteModalController',
      size: size
    });

    modalInstance.result.then(function () {
      //Ok, esborra reserva
      apiService.deleteReserva(idToDelete).then(function(data) {
        console.log(data);


          $scope.getReservas();

      }, function() {

      });
    }, function () {
      //Cancel
    });
  };

  //ADMIN
  $scope.es_admin = function() {
    return apiService.es_admin();
  };
});
