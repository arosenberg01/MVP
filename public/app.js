var myApp = angular.module('myApp', []);

myApp.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

myApp.controller('mainController', function($scope, $http) {
  $scope.data = {};

  $scope.getData = function() {

    $http.get('/linked')
      .success(function(data) {
          $scope.data = data;
          console.log(data);
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  };

});