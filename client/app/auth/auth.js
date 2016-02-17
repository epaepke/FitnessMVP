angular.module('fitness.auth', ['ngCookies'])

.controller('AuthController', function ($scope, $window, $location, $http, $rootScope, $cookies) {
  $scope.user = {};

  $scope.signup = function () {
    $http({
      method: 'POST',
      url: '/api/users/signup',
      data: $scope.user,
    }).then(function(err) {
      console.log(err);
    })
    $cookies.remove('user');
    $cookies.putObject('user', $scope.user);
    $location.path('/settings');
  };


  $scope.signin = function () {

    console.log('user sign in stuff ', JSON.stringify($scope.userSign))
    $http({
      method: 'POST',
      url: '/api/users/signin',
      data: $scope.userSign,
    }).then(function(user) {
      console.log('userData ' , user.data.name);
      $scope.userSign.name = user.data.name;
      $cookies.remove('user');
      $cookies.putObject('user', $scope.userSign);
      $location.path('/stats');
    })
  };
})
