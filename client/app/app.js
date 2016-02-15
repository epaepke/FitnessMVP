console.log('loaded app');

angular.module('fitness', ['fitness.auth',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  console.log('should route from here');
  $routeProvider
    .when('/', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signup.html',
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
    .otherwise({
      redirectTo: 'http://www.google.com'
    });
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');
})