var contacts = angular.module('contacts', ['ui.router']);
/***
 * 配置路由
 */
contacts.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('contacts', {
        abstract: true,
        url: '/contacts',
        templateUrl: 'tpls/contacts.html',
        resolve: {
            contacts: ['contacts',
                function (contacts) {
                    return contacts.all();
                }]
        },
        // You can pair a controller to your template. There *must* be a template to pair with.
        controller: ['$scope', '$state', 'contacts', 'utils',
            function ($scope, $state, contacts, utils) {
                $scope.contacts = contacts;
                $scope.goToRandom = function () {
                    var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);
                    $state.go('contacts.detail', { contactId: randId });
                };
            }]
    })
    .state('contacts.list', {
            url: '',
            templateUrl: 'tpls/contacts.list.html'
        })
        .state('contacts.detail', {
            url: '/{contactId:[0-9]{1,4}}',
            views: {
                // So this one is targeting the unnamed view within the parent state's template.
                '': {
                    templateUrl: 'tpls/contacts.detail.html',
                    controller: ['$scope', '$stateParams', 'utils',
                        function ($scope, $stateParams, utils) {
                            $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                        }]
                },
                'hint@': {
                    template: 'This is contacts.detail populating the "hint" ui-view'
                },
                // This one is targeting the ui-view="menuTip" within the parent state's template.
                'menuTip': {

                    templateProvider: ['$stateParams',
                        function ($stateParams) {
                            return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
                        }]
                }

            }
        })
});