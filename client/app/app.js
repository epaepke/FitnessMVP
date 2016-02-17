console.log('loaded app');

angular.module('fitness', ['fitness.auth', 
  'fitness.stats',
  'fitness.settings',
  'ngRoute',
  'ngCookies'
])
.config(function ($routeProvider, $httpProvider) {
  console.log('should route from here');
  $routeProvider
    .when('/', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/stats', {
      templateUrl: 'app/stats/stats.html',
      controller: 'StatsController'
    })
    .when('/settings', {
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController'
    })
    .otherwise({
      redirectTo: '/signin'
    });
})