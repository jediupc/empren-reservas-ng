angular.module("uiRouterExample", ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'home.html'
    })
    .state('about', {
        url: '/about',
        templateUrl: 'about.html',
    })
    .state('list', {
        url: '/list',
        templateUrl: 'list.html',
        controller: 'ListCtrl'
    })
    .state('list.item', {
        url: '/:item',
        templateUrl: 'list.item.html',
        controller: function($scope, $stateParams) {
            $scope.item = $stateParams.item;
        }
    })
    .state('jumbo', {
        url: '/jumbo',
        templateUrl: 'jumbo.html',
    })
    .state('calendar', {
        url: '/calendar',
        templateUrl: 'calendar.html',
    })
})

.controller("ListCtrl", function($scope) {
    $scope.shoppingList = [
      {name: 'Milk'},
      {name: 'Eggs'},
      {name: 'Bread'},
      {name: 'Cheese'},
      {name: 'Ham'}
    ];

    $scope.selectItem = function(selectedItem) {
        _($scope.shoppingList).each(function(item) {
            item.selected = false;
            if (selectedItem === item) {
                selectedItem.selected = true;
            }
        });
    };
})