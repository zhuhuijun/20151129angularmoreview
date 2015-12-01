var aafac = angular.module('uiRouterSample.contacts.service', []);

// A RESTful factory for retrieving contacts from 'contacts.json'
aafac.factory('contacts', ['$http', 'utils', function ($http, utils) {
    var path = 'data/contacts.json';
    var contacts = $http.get(path).then(function (resp) {
        return resp.data.contacts;
    });

    var factory = {};
    factory.all = function () {
        return contacts;
    };
    factory.get = function (id) {
        return contacts.then(function () {
            return utils.findById(contacts, id);
        })
    };
    return factory;
}]);