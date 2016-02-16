angular.module('fitness.stats', ['fitness.auth'])

.controller('StatsController', function ($scope, $window, $location, $http) {
  $scope.Math=Math;
  $scope.total = 0;
  $scope.activities = [{act:'Jogging', quant:'Mins', burn:30, img:"run", color:'white'}, {act:'Walking', quant:'Mins', burn:8, img:"walk", color:'white'},  {act:'Pushups', quant:'Quantity', burn:5, img:"gym", color:'white'},  {act:'Situps', quant:'Quantity', burn:5, img:"gym", color:'white'},  {act:'Squats', quant:'Quantity', burn:6, img: "gym", color:'white'}];
  $scope.quantity = {};
  $scope.setCheck = false;

 $scope.showCheck = function(actData) {
    var show = $scope.total >= 1320;

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
      $scope.total = parseInt(user['jogging']) * 30 + parseInt(user['walking']) * 8 + parseInt(user['situps']) * 5 + parseInt(user['squats']) * 5 + parseInt(user['pushups']) * 6;
      $scope.barUpdate(Math.min($scope.total / 2, 640));
    });
  };


  $scope.barUpdate = function(width) {
    selection = d3.select("body").selectAll("#progressBar").data([$scope.total]);
    selection.style('color', 'white')
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
