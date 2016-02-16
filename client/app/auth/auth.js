angular.module('fitness.auth', ['ngCookies'])

.controller('AuthController', function ($scope, $window, $location, $http, $rootScope, $cookies) {
  $scope.user = {};

  // $scope.signin = function () {
  //   Auth.signin($scope.user)
  //     .then(function (token) {
  //       $window.localStorage.setItem('com.shortly', token);
  //       $location.path('/links');
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  $scope.signup = function () {
    $http({
      method: 'POST',
      url: '/api/users/signup',
      data: $scope.user,
    }).then(function(err) {
      console.log(err);
    })
    // $rootScope.user = $scope.user;
    $cookies.putObject('user', $scope.user);
    // console.log('a')
    $location.path('/stats');
  };


  $scope.signin = function () {

    console.log('user sign in stuff ', JSON.stringify($scope.userSign))
    $http({
      method: 'POST',
      url: '/api/users/signin',
      data: $scope.userSign,
    }).then(function(err, tt) {
      console.log('a');
      console.log('is this an error? ', err);
    })
    $cookies.putObject('user', $scope.user);
    $location.path('/stats');
  };
})
