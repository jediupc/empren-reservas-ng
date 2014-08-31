angular.module('reservas').factory('apiService', function($q, $http, $cookies, $state) {

	//var SERVER_URL = "http://10.182.57.226:8080/api/";
	var SERVER_URL = "http://localhost:8088/api/";
	var username = $cookies.username;
	var password = $cookies.password;

	login('flor', 'flor', 0);

	function login(user, pass, rememberMe) {
		var url = "usuaris";
		var method = "GET";
		username = user;
		password = pass;
		ajax(url, method, "", "").then(function(data) {
			console.log(data);
			if(rememberMe) {
				$cookies.username = user;
				$cookies.password = pass;
			}
			$state.go('main');
		}, function(error) {
			console.log(error);
		})
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
		}

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

	return {login: login};
})