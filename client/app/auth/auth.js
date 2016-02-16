angular.module('fitness.auth', [])

.controller('AuthController', function ($scope, $window, $location, $http, $rootScope) {
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
    console.log('this be tha user', $scope.user)
    $http({
      method: 'POST',
      url: '/api/users/signup',
      data: $scope.user,
    }).then(function(err) {
      console.log(err);
    })
    $rootScope.user = $scope.user;
    console.log('a')
    $location.path('/stats');
  };
})
