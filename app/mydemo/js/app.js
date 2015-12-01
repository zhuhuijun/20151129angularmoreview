var myApp = angular.module('myApp', ['ui.router' , 'ngAnimate']);
//run
myApp.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);
/***
 * 路由的配置及
 */

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')
        .otherwise('/');
    $stateProvider.state("home", {
        url: '/',
        templateUrl: 'tpls/home.html'
    }).state('about', {
            url: '/about',
            templateUrl: 'tpls/about.html'
        });
});
