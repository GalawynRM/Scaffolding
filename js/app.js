/*global angular, console */
(function UseStrict() {
    "use strict";

    var app = angular.module('App', ['ngRoute', 'ngSanitize']);

    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {

        $routeProvider
            .when('/',
                {
                    redirectTo: '/home'
                })
            .when('/home',
                {
                    templateUrl: 'views/view.html',
                    controller: 'homeController',
                    activetab: "home",
                    title: "Home"
                })
            .otherwise({
                redirectTo: '/home'
            });

        // enable html5Mode for pushstate ('#'-less URLs)
        //$locationProvider.html5Mode(true);

    }]);

    // Initialize the application
    app.run(['$location', function AppRun($location) {

    }]);

    app.controller('AppController', function ($scope, $http, $route) {
        $scope.$route = $route;

        $scope.$on("$routeChangeSuccess",
            function handleRouteChangeSuccessEvent(event) {
                $scope.activetab = $route.current.activetab;
            }
            );
    });


    app.controller("homeController", function ($scope, $http, $route) {



    });

    app.directive('routelink', ['$rootScope', '$route',
        function ($rootScope, $route) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element, attr) {
                    var activetab = "";
                    scope.$on("$routeChangeSuccess",
                        function handleRouteChangeSuccessEvent(event) {
                            activetab = $route.current.activetab;
                            var href = "";
                            if (attr.routelink !== "") {
                                href = attr.routelink;
                            } else {
                                href = attr.href;
                            }

                            if (activetab === href) {
                                element.addClass("active");
                            } else {
                                element.removeClass("active");
                            }
                            element.attr("href", "#/" + attr.href);
                        });
                }
            };
        }]);    

}());

