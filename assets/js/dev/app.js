_.contains = _.includes;

angular
  .module('app', ['ui.router', 'restangular', 'toaster', 'ngAnimate'])
  .config(['$urlRouterProvider', '$stateProvider', 'RestangularProvider', function ($urlRouterProvider, $stateProvider, RestangularProvider) {
    // RestangularProvider.setPlainByDefault = true;
    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
      if (data.response && data.response.data) {
        var returnedData = data.response.data;
        returnedData.message = data.response.message;
        returnedData.meta = data.response.meta || {};
        return returnedData;
      } else {
        return data;
      }
    });
    console.log('Angular app started');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('login', {
        url: '/',
        controller: 'loginCtrl',
        templateUrl: 'templates/login.html'
      })
      .state('dashboard', {
        url: '/dashboard',
        // controller: 'dashboardCtrl',
        templateUrl: 'templates/dashboard.html'
      });
  }]).factory('API', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setFullResponse(true);
    });
  });
