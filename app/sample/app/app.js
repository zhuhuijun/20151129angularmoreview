// Make sure to include the `ui.router` module as a dependency
var app = angular.module('uiRouterSample', [
    'uiRouterSample.contacts',
    'uiRouterSample.contacts.service',
    'uiRouterSample.utils.service',
    'ui.router',
    'ngAnimate'
]);
app.run(
    [ '$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
);
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when('/c?id', '/contacts/:id')
            .when('/user/:id', '/contacts/:id')
            .otherwise('/');
        $stateProvider.state("home", {

            // Use a url of "/" to set a state as the "index".
            url: "/",
            template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
                '<p>Use the menu above to navigate. ' +
                'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
                '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
                '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'

        })
            .state('about', {
                url: '/about',
                templateProvider: ['$timeout',
                    function ($timeout) {
                        return $timeout(function () {
                            return '<p class="lead">UI-Router Resources</p><ul>' +
                                '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                                '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                                '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                                '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                                '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                                '</ul>';
                        }, 100);
                    }]
            })
    }
]);
