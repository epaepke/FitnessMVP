angular.module('fitness.stats', [])

.controller('StatsController', function ($scope, $window, $location) {
  $scope.user = {};

  selection = d3.select("body").selectAll("#progressBar");
  selection.html('2000')
  .style('color', 'white')
  .style('text-align', 'right')
  .style('vertical-align', 'text-bottom')
  .style('width', '0px')
  .style('background-color', 'green')
  .transition()
  .duration(1000)
  .style('width', '100px')
});
