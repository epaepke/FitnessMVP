angular.module('fitness.stats', ['fitness.auth', 'ngCookies'])

.controller('StatsController', function ($scope, $window, $location, $http, $rootScope, $cookies) {
  $scope.Math=Math;
  $scope.total = 0;
  $scope.activities = [{act:'Jogging', quant:'Mins', burn:30, img:"run", color:'white'}, {act:'Walking', quant:'Mins', burn:8, img:"walk", color:'white'}, {act:'Situps', quant:'Quantity', burn:5, img:"situp", color:'white'},  {act:'JumpRope', quant:'Mins', burn:50, img: "jump", color:'white'}, {act:'Pushups', quant:'Quantity', burn:5, img:"pushup", color:'white'}];
  $scope.quantity = {};
  $scope.setCheck = false;
  $scope.user = $cookies.getObject('user');
  $scope.cals = $cookies.get('cals') || 1320;

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
      params: {query: $scope.user},
      contentType: 'application/json'
    }).then(function(user) {
      user = user.data
      $scope.quantity['Jogging'] = parseInt(user['jogging']);
      $scope.quantity['Walking'] = parseInt(user['walking']);
      $scope.quantity['Situps'] = parseInt(user['situps']);
      $scope.quantity['Pushups'] = parseInt(user['pushups']);
      $scope.quantity['JumpRope'] = parseInt(user['jumprope']);
      $scope.total = parseInt(user['jogging']) * 30 + parseInt(user['walking']) * 8 + parseInt(user['situps']) * 5 + parseInt(user['jumprope']) * 5 + parseInt(user['pushups']) * 6;
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
