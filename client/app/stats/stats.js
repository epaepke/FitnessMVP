angular.module('fitness.stats', [])

.controller('StatsController', function ($scope, $window, $location, $http) {
  $scope.user = {};
  $scope.total = 200;
  $scope.activities = [{act:'Jogging', quant:'Mins'}, {act:'Walking', quant:'Mins'},  {act:'Pushups', quant:'Quantity'},  {act:'Situps', quant:'Quantity'},  {act:'Squats', quant:'Quantity'}];
  $scope.quantity = {};



  $scope.update = function(actData) {
    $http({
      method: 'POST',
      url: '/api/users/update',
      data: actData
    }).then($scope.getInfo());
  }

  $scope.getInfo = function(actData) {
    console.log('bout to get some data');
    $http({
      method: 'GET',
      url: '/api/users/obtain',
      contentType: 'application/json'
    }).then(function(a) {
      console.log(a);
    });
  };


  $scope.barUpdate = function() {
    var width = $scope.total + 'px';
    selection = d3.select("body").selectAll("#progressBar");
    selection.html($scope.total)
    .style('color', 'white')
    .style('text-align', 'right')
    .style('vertical-align', 'text-bottom')
    .style('width', '0')
    .style('background-color', 'green')
    .transition()
    .duration(2000)
    .style('width', width)
  }

  $scope.barUpdate();
});
