'use strict';

sfLoginModule.factory('usuarioService', ['$http', function ($http) {

    var BASE_URL = 'http://localhost:8080/api/usuario/',
        buildUrl = function (base, action, params) {
            var url = base,
                sep = '?';

            if (action)
                url += action;

            angular.forEach(params, function (value, key) {
                if (value && value !== "") {
                    url += sep + key + '=' + value;
                    sep = '&';
                }
            });

            return url;
        },
        getUsuarios = function (success, error) {
            $http.get(buildUrl(BASE_URL)).success(function (data) {
                if (success)
                    success(data);
            }).error(function (data) {
                if (error)
                    error(data);
            });
        }
    return { getUsuarios: getUsuarios }

}]);
