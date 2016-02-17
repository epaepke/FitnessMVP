angular.module('fitness.settings', ['fitness.auth', 'ngCookies'])

.controller('SettingsController', function ($scope, $window, $location, $http, $cookies, $location) {
  $scope.Math=Math;

  $scope.updateCals = function(a) {
    $cookies.put('cals', a);
    $location.path('/stats')
  }
});
