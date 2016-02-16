angular.module('fitness.stats', [])

.controller('StatsController', function ($scope, $window, $location) {
  $scope.user = {};
  $scope.activities = [{act:'Jogging', quant:'Mins'}, {act:'Running', quant:'Mins'},  {act:'Pushups', quant:'Quantity'},  {act:'Sit-ups', quant:'Quantity'},  {act:'Squats', quant:'Quantity'}];
  $scope.quantity = {};
  $scope.update = function(t) {
    console.log($scope.quantity);
  }

  selection = d3.select("body").selectAll("#progressBar");
  selection.html('2000')
  .style('color', 'white')
  .style('text-align', 'right')
  .style('vertical-align', 'text-bottom')
  .style('width', '0px')
  .style('background-color', 'green')
  .transition()
  .duration(2000)
  .style('width', '100px')
});
