(function () {
    'use strict';

    angular
        .module('app')
        .factory('TwitterService', TwitterService);

    TwitterService.$inject = ['$http'];
    function TwitterService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.SaveToken = SaveToken;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetToken(username) {
			return $http.get('http://localhost:8080/api/usuario/token/twitter/email/' + username).then(handleSuccess, handleError('Error al obtener usuario!'));
        }

        function SaveToken(token) {
            return $http.post('http://localhost:8080/api/usuario/push', token).then(handleSuccess, handleError('Error al crear el usuario!'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
