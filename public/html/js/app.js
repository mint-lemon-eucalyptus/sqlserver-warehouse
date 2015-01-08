'use strict';
var rootUrl = '/html/partials/';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'myApp.services']).


    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/goods/list',
            {templateUrl: rootUrl + 'goods/list.html', controller: GoodsListController});
        $routeProvider.when('/goods/edit/:id',
            {templateUrl: rootUrl + 'goods/edit.html', controller: GoodsEditController});
        $routeProvider.when('/goods/new',
            {templateUrl: rootUrl + 'goods/add.html', controller: GoodsAddController});

        $routeProvider.when('/agents/list',
            {templateUrl: rootUrl + 'agents/list.html', controller: AgentsListController});
        $routeProvider.when('/agents/edit/:id',
            {templateUrl: rootUrl + 'agents/edit.html', controller: AgentsEditController});
        $routeProvider.when('/agents/new',
            {templateUrl: rootUrl + 'agents/add.html', controller: AgentsAddController});


        $routeProvider.when('/pricing/list',
            {templateUrl: rootUrl + 'pricing/list.html', controller: PricingListController});

        $routeProvider.when('/pricing/new',
            {templateUrl: rootUrl + 'pricing/add.html', controller: PricingAddController});

        $routeProvider.when('/pricing/edit/:id',
            {templateUrl: rootUrl + 'pricing/edit.html', controller: PricingEditController});



        //     $routeProvider.when('/excercises',
        //       {templateUrl: rootUrl + 'excercises/list.html', controller: ExcercisesListController});

        $routeProvider.otherwise({redirectTo: '/goods/list'});
//        $locationProvider.html5Mode(true);
    }]);
