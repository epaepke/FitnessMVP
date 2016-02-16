angular.module('fitness.stats', [])

.controller('StatsController', function ($scope, $window, $location, $http) {
  $scope.user = {};
  $scope.activities = [{act:'Jogging', quant:'Mins'}, {act:'Running', quant:'Mins'},  {act:'Pushups', quant:'Quantity'},  {act:'Sit-ups', quant:'Quantity'},  {act:'Squats', quant:'Quantity'}];
  $scope.quantity = {};
  $scope.update = function(actData) {
    $http({
      method: 'POST',
      url: '/api/users/update',
      data: actData
    })
  }

  selection = d3.select("body").selectAll("#progressBar");
  selection.html('5400')
  .style('color', 'white')
  .style('text-align', 'right')
  .style('vertical-align', 'text-bottom')
  .style('width', '0px')
  .style('background-color', 'green')
  .transition()
  .duration(2000)
  .style('width', '45%')
});
