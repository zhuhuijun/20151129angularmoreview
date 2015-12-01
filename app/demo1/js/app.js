var app = angular.module('myApp', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/con4', 'con0');
    $urlRouterProvider.otherwise('con0');
    $stateProvider.state('home', {
        url: '/',
        views: {
            '': {
                templateUrl: 'pages/main.html'
            },
            'top': {
                templateUrl: 'pages/top.html'
            },
            'left': {
                templateUrl: 'pages/left.html'
            }
        }
    })
        .state('home.con0', {
            url: 'con0',
            templateUrl: 'pages/con0.html'
        })
        .state('home.con1', {
            url: 'con1',
            templateUrl: 'pages/con1.html'
        })
        .state('home.con2', {
            url: 'con2',
            templateUrl: 'pages/con2.html'
        })
        .
        state('home.con3', {
            url: 'con3',
            templateUrl: 'pages/con3.html'
        })
        .
        state('home.con4', {
            url: 'con4',
            templateUrl: 'pages/con4.html'
        })

});
