'use strict';
var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'view/user-list/list-template.html',
                controller: 'ListController'
            }).
            when('/form', {
                templateUrl: 'view/user-form/form-template.html',
                controller: 'FormController'
            }).
            when('/edit/:id', {
                templateUrl: 'view/edit-form/edit-template.html',
                controller: 'EditController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }
]);
