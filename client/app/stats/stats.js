angular.module('fitness.stats', [])

.controller('StatsController', function ($scope, $window, $location, $http) {
  $scope.user = {};
  $scope.total = 0;
  $scope.activities = [{act:'Jogging', quant:'Mins'}, {act:'Walking', quant:'Mins'},  {act:'Pushups', quant:'Quantity'},  {act:'Situps', quant:'Quantity'},  {act:'Squats', quant:'Quantity'}];
  $scope.quantity = {};



  $scope.update = function(actData) {
    $http({
      method: 'POST',
      url: '/api/users/update',
      data: actData
    }).then(function (a) {
      $scope.getInfo();
    });
  };

  $scope.getInfo = function() {
    console.log('bout to get some data');
    $http({
      method: 'GET',
      url: '/api/users/obtain',
      contentType: 'application/json'
    }).then(function(user) {
      user = user.data
      $scope.quantity['Jogging'] = parseInt(user['jogging']);
      $scope.quantity['Walking'] = parseInt(user['walking']);
      $scope.quantity['Situps'] = parseInt(user['situps']);
      $scope.total = parseInt(user['jogging']) + parseInt(user['walking']) + parseInt(user['situps']);
      $scope.barUpdate();
    });
  };


  $scope.barUpdate = function() {
    var width = $scope.total + 'px';
    selection = d3.select("body").selectAll("#progressBar");
    selection.html($scope.total)
    .style('color', 'white')
    .style('text-align', 'right')
    .style('vertical-align', 'text-bottom')
    .style('background-color', 'green')
    .transition()
    .duration(1500)
    .style('width', width)
  }
  $scope.getInfo();
  $scope.barUpdate();
});
