var contacts = angular.module('uiRouterSample.contacts', ['ui.router']);
/***
 * 配置路由
 */
contacts.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('contacts', {
        abstract: true,
        url: '/contacts',
        templateUrl: 'pages/contacts.html',
        // Use `resolve` to resolve any asynchronous controller dependencies
        // *before* the controller is instantiated. In this case, since contacts
        // returns a promise, the controller will wait until contacts.all() is
        // resolved before instantiation. Non-promise return values are considered
        // to be resolved immediately.
        resolve: {
            contacts: ['contacts',
                function (contacts) {
                    return contacts.all();
                }]
        },
        // You can pair a controller to your template. There *must* be a template to pair with.
        controller: ['$scope', '$state', 'contacts', 'utils',
            function ($scope, $state, contacts, utils) {

                // Add a 'contacts' field in this abstract parent's scope, so that all
                // child state views can access it in their scopes. Please note: scope
                // inheritance is not due to nesting of states, but rather choosing to
                // nest the templates of those states. It's normal scope inheritance.
                $scope.contacts = contacts;

                $scope.goToRandom = function () {
                    var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

                    // $state.go() can be used as a high level convenience method
                    // for activating a state programmatically.
                    $state.go('contacts.detail', { contactId: randId });
                };
            }]
    })
        /////////////////////
        // Contacts > List //
        /////////////////////

        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'list' within the parent 'contacts' state.
        .state('contacts.list', {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/contacts' (because '/contacts' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            templateUrl: 'pages/contacts.list.html'
        })
        ///////////////////////
        // Contacts > Detail //
        ///////////////////////

        // You can have unlimited children within a state. Here is a second child
        // state within the 'contacts' parent state.
        .state('contacts.detail', {
            // Urls can have parameters. They can be specified like :param or {param}.
            // If {} is used, then you can also specify a regex pattern that the param
            // must match. The regex is written after a colon (:). Note: Don't use capture
            // groups in your regex patterns, because the whole regex is wrapped again
            // behind the scenes. Our pattern below will only match numbers with a length
            // between 1 and 4.

            // Since this state is also a child of 'contacts' its url is appended as well.
            // So its url will end up being '/contacts/{contactId:[0-9]{1,4}}'. When the
            // url becomes something like '/contacts/42' then this state becomes active
            // and the $stateParams object becomes { contactId: 42 }.
            url: '/{contactId:[0-9]{1,4}}',
            // If there is more than a single ui-view in the parent template, or you would
            // like to target a ui-view from even higher up the state tree, you can use the
            // views object to configure multiple views. Each view can get its own template,
            // controller, and resolve data.

            // View names can be relative or absolute. Relative view names do not use an '@'
            // symbol. They always refer to views within this state's parent template.
            // Absolute view names use a '@' symbol to distinguish the view and the state.
            // So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
            views: {
                // So this one is targeting the unnamed view within the parent state's template.
                '': {
                    templateUrl: 'pages/contacts.detail.html',
                    controller: ['$scope', '$stateParams', 'utils',
                        function ($scope, $stateParams, utils) {
                            $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                        }]
                },
                // This one is targeting the ui-view="hint" within the unnamed root, aka index.html.
                // This shows off how you could populate *any* view within *any* ancestor state.
                'hint@': {
                    template: 'This is contacts.detail populating the "hint" ui-view'
                },
                // This one is targeting the ui-view="menuTip" within the parent state's template.
                'menuTip': {
                    // templateProvider is the final method for supplying a template.
                    // There is: template, templateUrl, and templateProvider.
                    templateProvider: ['$stateParams',
                        function ($stateParams) {
                            // This is just to demonstrate that $stateParams injection works for templateProvider.
                            // $stateParams are the parameters for the new state we're transitioning to, even
                            // though the global '$stateParams' has not been updated yet.
                            return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
                        }]
                }

            }
        })
        .state('contacts.detail.item', {
            url: 'item/:itemId',
            views: {
                // This is targeting the unnamed ui-view within the parent state 'contact.detail'
                // We wouldn't have to do it this way if we didn't also want to set the 'hint' view below.
                // We could instead just set templateUrl and controller outside of the view obj.
                '': {
                    templateUrl: 'pages/contacts.detail.item.html',
                    controller: function ($scope, $stateParams, $state, utils) {
                        $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);

                        $scope.edit = function () {
                            // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
                            // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
                            // Here we are going down to the child state 'edit' (full name of 'contacts.detail.item.edit')
                            $state.go('.edit', $stateParams);
                        };
                    }
                },
                // Here we see we are overriding the template that was set by 'contacts.detail'
                'hint@': {
                    template: ' This is contacts.detail.item overriding the "hint" ui-view'
                }
            }
        }).state('contacts.detail.item.edit', {
            views: {
                '@contacts.detail': {
                    templateUrl: 'pages/contacts.detail.item.edit.html',
                    controller: ['$scope', '$stateParams', '$state', 'utils',
                        function ($scope, $stateParams, $state, utils) {
                            $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
                            $scope.done = function () {
                                // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                                $state.go('^', $stateParams);
                            };
                        }]
                }
            }
        })
});