'use strict';

/* Controllers */

var controllers=angular.module('myApp.controllers', []);

controllers.controller('listaCtrl', ['$scope', '$http', function($scope, $http) {
  	$scope.cosa ="";
  	$scope.selectedRow="";
  	$scope.edit=false;
  	$scope.updateForm = {};
  	$scope.datos = [
  	];
  	$scope.new = function(cosa){
  		$scope.datos.push(cosa);
  		this.cosa = "";
  	};
  	$scope.select = function(index){
  		if($scope.selectedRow !== index) $scope.edit = false;
  		$scope.selectedRow = index;
  	};
  	$scope.delete = function(index){
  		$scope.datos.splice(index,1);
  		$scope.selectedRow = "";
  	};
  	$scope.startToEdit = function(index){
  		$scope.edit = true;
  		$scope.updateForm = $scope.datos[index];
  	};
  	$scope.editing = function(index){
  		return $scope.selectedRow === index && $scope.edit;
  	};
  	
  	$scope.update = function(index){
  		console.log('guardar was clicked with index '+index);
  		$scope.datos[index] = $scope.updateForm;
  		$scope.edit=false;
  	}
  }]);
controllers.controller('MyCtrl2',['$scope','listaCtrl',function($scope){
	
}]);

controllers.controller('DatepickerDemoCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
});

controllers.controller('TimePickerCtrl', function ($scope) {
  $scope.time = new Date();

});

controllers.controller('CtrlUsuarios', function ($scope) {

});