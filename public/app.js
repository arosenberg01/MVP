var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope, $http) {
  $scope.data = {};

  $scope.getLinkedIn = function() {

    $http.post('/linkedin', {
      'url': $scope.url}
      )
      .success(function(data) {

        console.log('sending post!')
          // $scope.data.profile = data;
          console.log(data);

      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  };

   $scope.hitAngelList = function() {

    $http.get('/angellist')
      .success(function(data) {
          // $scope.data = data;
          console.log('data received!');
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  };

});

myApp.directive('linkedIn', function() {
  var link = function(scope, element, attr) {

  }

  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' },
  }
})