var myApp = angular.module('myApp', ['ui.router']);


/***
 * 关于配置的相关内容
 */
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/report");
    $stateProvider
        .state('report', {
            url:'report',
            views: {
                'filters': {
                    templateUrl: 'pages/report-filters.html',
                    controller: 'filtersCtrl'
                },
                'tabledata': {
                    templateUrl: 'pages/report-tabledata.html',
                    controller: 'tabledataCtrl'
                },
                'graph': {
                    templateUrl: 'pages/report-graphic.html',
                    controller: 'graphCtrl'
                }
            }
        });
});

