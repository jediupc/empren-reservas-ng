angular.module('reservas').factory('apiService', function($q, $http, $cookies, $state, $window) {

	//var SERVER_URL = "http://10.85.107.202:8088/api/";
	//var SERVER_URL = "http://192.168.1.100:8080/"
	var SERVER_URL = "http://localhost:8080/";

  var _model = {user: null, espais: null, reservas: null};
	//login('flor', 'flor', 1);

  function tryLogin() {
		var q = $q.defer();
		getUser().then(function(res){
			_model.user = res.data[0];
			q.resolve();
		}, function(err){
			q.reject();
		});

		return q.promise;
  }

	function login(user, pass) {
		var url = "authenticate";
		var method = "POST";
		var data = {
			username: user,
			password: pass
		};

		var q = $q.defer();
		ajax(url, method, "", data).then(function(data) {

      _model.user = data.data.usuari;
			$window.sessionStorage.token = data.data.token;
			q.resolve();
		}, function(error) {
			q.reject(error);
		});
		return q.promise;
	}

	function logOff() {
		var url = "api/usuaris";
		var method = "GET";
		$window.sessionStorage.token = "";
		ajax(url , method, "", "").then(function(data) {
			$state.go('index');
		}, function(error) {
			console.log(error);
		})
	}

	function cambiaContrasenya(oldPassword, newPassword) {
		var url = "api/usuaris/" + _model.user._id;
		var method = "PUT";
		var q = $q.defer();

		var data = {
			oldPassword: oldPassword,
			newPassword: newPassword
		};

		ajax(url, method, "", data).then(function(data) {
			q.resolve(data);
		}, function(error) {
			//ERROR 495 old password incorrect
			//Error 496 password minimum 8 characters length
			q.reject(error);
		});

		return q.promise;
	}

	function getEspais() {
		var url = "api/espais";
		var method = "GET";
		var q = $q.defer();

		ajax(url, method, "", "").then(function(data) {
			q.resolve(data);
      _model.espais = data.data;
		}, function(error) {
			if(error.status === 401) {
				$state.go('index');
			}
			q.reject(error);
		});

		return q.promise;
	}

  function createEspai(codi, descripcio) {
    var url = "api/espais";
    var method = "POST";
    var q = $q.defer();

    var data = {
			codi: codi,
			descripcio: descripcio
		};

    ajax(url, method, "", data).then(function(data) {
			getEspais().then(function(data) {
				q.resolve();
			});
    }, function(err) {
			q.reject(err);
    });
    return q.promise;
  }

	function deleteEspai(idToDelete) {
		var url = "api/espais/"+ idToDelete;
		var method = "DELETE";
		var q = $q.defer();

		ajax(url, method, "", "").then(function(data) {
			getEspais().then(function(data) {
				q.resolve();
			});
		}, function(err) {
			q.reject(err);
		});
		return q.promise;
	}

	/**
	 * get self user. Used jsonwebtoken for that.
	 */
	function getUser() {
		var url = 'api/usuaris';
		var method = "GET";
		var q = $q.defer();

		ajax(url, method, "", "").then(function(res){

			_model.user = res.data[0];


			q.resolve(res);
		}, function(err) {
			q.reject();
		});
		return q.promise;
	}

	function es_admin() {
		return _model.user.es_admin;
	}

  function createUser(nom_usuari, contrasenya, nom, cognoms) {
    var url = 'api/usuaris';
    var method = 'POST';
    //var data = 'nom_usuari=' + nom_usuari + "&contrasenya=" + contrasenya + "&nom=" + nom + "&cognoms=" + cognoms + "&es_admin=false";
		var data = {
			nom_usuari: nom_usuari,
			contrasenya: contrasenya,
			nom: nom,
			cognoms: cognoms
		};

    var q = $q.defer();

    ajax(url, method, "", data).then(function(data) {
      q.resolve(data);
    }, function(err) {
      q.reject(err);
    });

    return q.promise;
  }

  function getReservas(espai, inici) {
    var url = 'api/reserves';
    var method = 'GET';

    var q = $q.defer();

		var data = "?";
		if(espai) {
			data += "espai=" + espai + "&"
		}
		if(inici) {
			data += "inici=" + inici;
		}

		/*var data = {
			espai: espai,
			inici: inici
		};*/

    ajax(url + data, method, "" ,{}).then(function(data){
      _model.reservas = data;
      q.resolve(data);
    }, function(err) {
      q.reject(err);
    });

    return q.promise;
  }

  function setReserva(date, espai) {
    var url = "api/reserves";
    var method = "POST";
		var q = $q.defer();

		//Suposarem que la data ja ve en el format que ha de venir

		var data = {
			espai: espai,
			data_hora: date
		};

		ajax(url, method, "", data).then(function(data1) {
			getReservas().then(function(data) {
				q.resolve(data);
			});
		}, function(err) {
			//La reserva ja estaba posada si err.status == 490
			q.reject(err);

		});

		return q.promise;
  }

	function deleteReserva(idReserva) {
		var url = "api/reserves/" + idReserva;
		var method = "DELETE";
		var q = $q.defer();

		ajax(url, method, "","").then(function(data) {
			console.log(data);
			q.resolve(data);
		}, function(){
			q.reject();
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
				Authorization : 'Bearer ' + $window.sessionStorage.token
			},
			timeout: 10000
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
  	createUser: createUser,
		createEspai: createEspai,
		getReservas: getReservas,
		setReserva: setReserva,
		deleteReserva: deleteReserva,
		deleteEspai: deleteEspai,
		es_admin: es_admin,
		cambiaContrasenya: cambiaContrasenya
	};
});