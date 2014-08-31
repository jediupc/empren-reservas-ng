angular.module('reservas').factory('apiService', function($q, $http) {

	var SERVER_URL = "10.182.57.226:8080/api/";
	var username, password;

	function login(user, pass, rememberMe) {
		var url = "usuaris";
		var method = "GET";
		username = user;
		password = pass;
		ajax(url, method, "", "").then(function(data) {
			console.log(data);
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
			q.reject(error);
		});

		return q.promise;
	}

	return {login: login};
})