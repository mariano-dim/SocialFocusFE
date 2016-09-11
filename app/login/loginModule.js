'use strict';

var sfLoginModule = angular.module('socialFocusApp.loginModule', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'login/login.html',
      controller: 'loginCtrl'
    });
  }]).controller('loginCtrl', ['$scope', '$location','usuarioService', loginCtrlFunction]);


function loginCtrlFunction($scope, $location, usuario) {

  $scope.usuario = {
    email: '',
    password: ''
  };

  $scope.getUsuarios = function () {

    console.log("Test");
    console.log($scope.usuario.email);
    console.log($scope.usuario.password);

    // usuario.getUsuarios(function (data) {
    //   console.log(data);
    //   $scope.usuarios = data;
    // }, function (error) {
    //   console.log(error);
    // });
    // Redireccion a Home Page o Welcome Page
    $location.path('/');

  }
}