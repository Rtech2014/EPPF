angular
    .module('AuthApp',[
      'ui.router'
    ])
    .config(['$urlRouteProvider','$stateProvider',function($urlRouteProvider,$stateProvider){
        $urlRouteProvider.otherwise('/');

        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'partials/home.html'
          })
    }])
