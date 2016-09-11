'use strict';

// Declare app level module which depends on views, and components
angular.module('socialFocusApp', [
  'ngRoute',
  'socialFocusApp.loginModule',
  'socialFocusApp.dashboardModule'

]).
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/', {
      templateUrl: "login/login.html",
      controller: 'loginCtrl'
    })
      .when('/', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'dashboardCtrl'
      })
      .otherwise({ redirectTo: '/login' });
  }]);
