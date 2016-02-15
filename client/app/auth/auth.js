angular.module('fitness.auth', [])

.controller('AuthController', function ($scope, $window, $location) {
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
    // Auth.signup($scope.user)
    //   .then(function (token) {
    //     $window.localStorage.setItem('com.shortly', token);
    //     $location.path('/links');
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  };
});
