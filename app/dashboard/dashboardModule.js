'use strict';

angular.module('socialFocusApp.dashboardModule', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
      templateUrl: 'dashboard/dashboard.html',
      controller: 'dashboardCtrl'
    });
  }]).controller('dashboardCtrl', ['$scope', 'usuarioService', dasboardCtrlFunction]);

function dasboardCtrlFunction($scope, usuario) {

  console.log("dasboardCtrlFunction");

  $scope.init = function () {
    console.log("init");

    usuario.getUsuarios(function (data) {
      console.log(data);
      $scope.usuarios = data;
    }, function (error) {
      console.log(error);
    });
  }

  // init the page
  $scope.init();

}
