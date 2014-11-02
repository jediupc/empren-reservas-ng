angular.module('reservas').factory('apiService', function($q, $http, $cookies, $state) {

	//var SERVER_URL = "http://10.85.107.202:8088/api/";
	var SERVER_URL = "http://localhost:8088/api/";
	var username = $cookies.username;
	var password = $cookies.password;

  var _model = {user: null, espais: null, reservas:null};
	//login('flor', 'flor', 1);

  function tryLogin() {
    //try cookies
    login(username, password, true);
  }

	function login(user, pass) {
		var url = "usuaris";
		var method = "GET";
		username = user;
		password = pass;
		ajax(url, method, "", "").then(function(data) {
			//if(rememberMe) {
				$cookies.username = user;
				$cookies.password = pass;
			//}

      _model.user = data[0];
			$state.go('main');
		}, function(error) {
			console.log(error);
      $state.go('index');
		})
	}

	function logOff() {
		var url = "usuaris";
		var method = "GET";
		username = null;
		password = null;
    	$cookies.username = "";
    	$cookies.password = "";
		ajax(url , method, "", "").then(function(data) {
			$state.go('index');
		}, function(error) {
			console.log(error);
		})
	}

	function getEspais() {
		var url = "espais";
		var method = "GET";
		var q = $q.defer();

		ajax(url, method, "", "").then(function(data) {
			q.resolve(data);
      _model.espais = data;
		}, function(error) {
			if(error.status === 401) {
				$state.go('index');
			}
			q.reject(error);
		});

		return q.promise;
	}

  function createEspai(codi, descripcio) {
    var url = "espais";
    var method = "POST";
    var q = q.defer();

    var data = 'codi=' + codi + '&descripcio=' + descripcio;

    ajax(url, method, "", data).then(function(data) {
      getEspais();
    }, function(err) {

    });

    return q.promise;
  }

  function createUser(nom_usuari, contrasenya, nom, cognoms) {
    var url = 'usuaris';
    var method = 'POST';
    var data = 'nom_usuari=' + nom_usuari + "&contrasenya=" + contrasenya + "&nom=" + nom + "&cognoms=" + cognoms + "&es_admin=false";

    var q = $q.defer();

    ajax(url, method, "", data).then(function(data) {
      q.resolve(data);
    }, function(err) {
      q.reject(err);
    });

    return q.promise;
  }

  function getReservas(espai) {
    var url = 'reserves';
    var method = 'GET';

    var q = q.defer();

    var data = "espai=" + espai;

    ajax(url, method, "", data).then(function(data){
      _model.reservas = data;
      q.resolve(data);
    }, function(err) {
      q.reject(err);
    });

    return q.promise;
  }

	function ajax(url, method, params, data) {
		
		var options = {
			method: method, 
			url: SERVER_URL+url, 
			params: params, 
			data: data, 
			headers: {
				X_USERNAME: username,
				X_PASSWORD: password
			},
			timeout: 5000   
		};

		var q = $q.defer();

		$http(options).then(function(data) {
			q.resolve(data);
		}, function(error) {
			if(error.status === 401) {
				$state.go('index');
			}
			q.reject(error);
		});

		return q.promise;
	}

	return {
	login: login,
    logOff: logOff,
    getEspais: getEspais,
    tryLogin: tryLogin,
  	model:_model, 
  	createUser: createUser};
});