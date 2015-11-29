var myApp = angular.module('myApp', ['ui.router']);
/***
 * 路由的配置及
 */
myApp.config(function ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/contacts');
    //$urlRouterProvider.when('/index', '/index');
    $stateProvider
        .state('contacts', {
            url: '/contacts',
            templateUrl: 'pages/contacts.html'
        })
        .state('contacts.detail', {
            views: {
                // 嵌套状态，对应的父模板是 contacts.html

                // 相对命名
                // contacts.html 中 <div ui-view='detail'/> 将对应下面
                "detail": {
                    templateUrl: 'pages/details.html'
                },

                // 相对命名
                // 对应 contacts.html 中的未命名 ui-view <div ui-view/>
                "": {
                    templateUrl: 'pages/contacts.details.html'
                },

                // 绝对命名
                // 对应 contacts.detail.html 中 <div ui-view='info'/>
                "info@contacts.detail": { },

                // 绝对命名
                // 对应 contacts.html 中 <div ui-view='detail'/>
                "detail@contacts": { },

                // 绝对命名
                // 对应 contacts.html 中的未命名 ui-view <div ui-view/>
                "@contacts": { },

                // 绝对命名
                // 对应 index.html 中 <div ui-view='status'/>
                "status@": { },

                // 绝对命名
                // 对应 index.html 中 <div ui-view/>
                "@": {
                    templateUrl: '/pages/index.default.html'
                }
            }})
});
