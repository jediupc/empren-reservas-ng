'use strict';

/* Filters */

var filters = angular.module('myApp.filters', []);
  filters.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);
  filters.filter('range',[function(){
  	return function(input,total){
  		total = parseInt(total);
  		for(var i=0; i<total;i++)input.push(i);
  		return input;
  	};
  }]);
