angular.module('app')
  .controller('loginCtrl', ['$scope', '$state', 'Restangular', 'toaster', function ($scope, $state, Restangular, toaster) {
    console.log('Started: Login Controller');
    $scope.login = () => {
      let body = {
        email: $scope.email,
        password: $scope.password
      };
      Restangular.all('login').post(body).then(response => {
        console.log('Got response: ', response.plain());
        toaster.pop({
          type: 'success',
          title: response.message
        });
        $state.go('dashboard');
      }, error => {
        toaster.pop({
          type: 'error',
          title: 'Error',
          body: error.data.message
        });
      });
    };

  }]);