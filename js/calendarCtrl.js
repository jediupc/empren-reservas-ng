/**
 * Created by alberto on 2/11/14.
 */

angular.module('reservas').controller('calendarCtrl', function($scope, $stateParams, apiService, $modal, $q, $anchorScroll){
  $scope.today = function() {
    $scope.dt = new Date();
  };

  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  //Params
  $scope.espai_id = $stateParams.espai_id;

  $scope.espai_nom = $stateParams.espai_nom;

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();


  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  //timepicker
  $scope.hours = [8,9,10,11,12,13,14,15,16,17,18,19,20];
  $scope.hourSelected = $scope.hours[0];
  //Reservas

  /**
   * Funció per retornar un array amb les reserves del dia
   */
  $scope.reservesDia = [];
  $scope.reservesTotals = [];

  $scope.getReservasTotals = function() {

    var q = $q.defer();

    var data_avui = new Date();
    var inici = parseDateReserva(6, data_avui.getUTCDate(), data_avui.getUTCMonth()+1, data_avui.getFullYear());

    //Get from service
    apiService.getReservas($scope.espai_id, inici).then(function(data) {
      $scope.reservesTotals = data.data;
      q.resolve();
    }, function(err) {
      q.reject();
    });

    return q.promise;
  };

  /**
   * Function to use inside the html to return reservas from that day inside all days.
   */
  $scope.getReservasDia = function() {

    //Crea un nou array amb la hora a la que està agafada. agafa les dades de reservesTotals
    $scope.reservesDia = [];

    var date;
    var hour;
    for(var i = 0; i < $scope.reservesTotals.length; ++i) {
      date = new Date($scope.reservesTotals[i].data_hora);
      hour = date.getUTCHours();
      if(date.getUTCDate() == $scope.dt.getUTCDate()
        && date.getUTCMonth() == $scope.dt.getUTCMonth()
        && date.getUTCFullYear() == $scope.dt.getUTCFullYear()) {

        $scope.reservesDia.push({
          hour: parseSingleNum(hour),
          user: $scope.reservesTotals[i].usuari.nom_usuari
        });
      }

    }
  };

  $scope.getReservasTotals().then(function(){
    $scope.getReservasDia();
  });

  //Watcher to change the bookings when the day selected changes.
  $scope.$watch('dt', function(newValue, oldValue){
    $scope.getReservasDia();
  });

  /**
   * Function that gets a number and returns it as a string, adding a 0 on the left if needed
   * @param num
   */
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

  $scope.novaReserva = function() {
    var hora = $scope.hourSelected;
    var dia = $scope.dt.getUTCDate();
    var mes = $scope.dt.getUTCMonth() + 1;
    var any = $scope.dt.getFullYear();

    //Parse data
    var dateString = parseDateReserva(hora, dia, mes, any);
    //Call service
    apiService.setReserva(dateString, $scope.espai_id).then(function(data) {
      $scope.getReservasTotals().then(function(){
        $scope.getReservasDia();
      });
    }, function(err) {
      //If err == 490 vol dir que ja existeix la reserva.
      if(err.status === 490) {
        $scope.openErrorModal("Ja hi ha una reserva en l'hora i el dia seleccionats");
      }

    });

  };

  //Modal per enseñar l'error

  $scope.openErrorModal = function (text) {


    var size = 300;
    var modalInstance = $modal.open({
      templateUrl: 'html/modals/errorModal.html',
      controller: 'errorModalController',
      size: size,
      resolve: {
        text: function () {
          return text;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {

    }, function () {

    });
  };
});