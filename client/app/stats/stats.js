angular.module('fitness.stats', [])

.controller('StatsController', function ($scope, $window, $location, $http) {
  $scope.user = {};
  $scope.total = 0;
  $scope.activities = [{act:'Jogging', quant:'Mins'}, {act:'Walking', quant:'Mins'},  {act:'Pushups', quant:'Quantity'},  {act:'Situps', quant:'Quantity'},  {act:'Squats', quant:'Quantity'}];
  $scope.quantity = {};
  $scope.setCheck = false;

 $scope.showCheck = function(actData) {
    var show = $scope.total > 2840;

    if (show && !$scope.setCheck) {
      $scope.setCheck = true;
      $("<img src='../../assets/check.png'><img>").hide().appendTo('#banner').fadeIn(1500);
    }

    return show;
  };

  $scope.update = function(actData) {
    $http({
      method: 'POST',
      url: '/api/users/update',
      data: actData
    }).then(function () {
      $scope.getInfo();
    });
  };

  $scope.getInfo = function() {
    $http({
      method: 'GET',
      url: '/api/users/obtain',
      contentType: 'application/json'
    }).then(function(user) {
      user = user.data
      $scope.quantity['Jogging'] = parseInt(user['jogging']);
      $scope.quantity['Walking'] = parseInt(user['walking']);
      $scope.quantity['Situps'] = parseInt(user['situps']);
      $scope.quantity['Pushups'] = parseInt(user['pushups']);
      $scope.quantity['Squats'] = parseInt(user['squats']);
      $scope.total = parseInt(user['jogging'])*10 + parseInt(user['walking'])*3 + parseInt(user['situps'])*4 + parseInt(user['squats'])*4 + parseInt(user['pushups'])*4;
      $scope.barUpdate(Math.min($scope.total/4, 633));
    });
  };


  $scope.barUpdate = function(width) {
    // console.log('tottt', $scope.total);
    selection = d3.select("body").selectAll("#progressBar").data([$scope.total]);
    selection.style('color', 'white')
    // .text(function(d) { return d; })
    .style('text-align', 'right')
    .style('vertical-align', 'text-bottom')
    .style('background-color', 'green')
    .transition()
    .tween("text", function(d) {
      var i = d3.interpolate(this.textContent, d);
      return function(t) {
      this.textContent = Math.round(i(t));
    };
    })
    .duration(2000)
    .style('width', width + 'px')
  }
  $scope.getInfo();
  $scope.barUpdate();
});
