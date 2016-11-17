(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;
		
		function register() {
			//armo un patrón por expresiones regulares que se adapte a una dirección de correo válida
			var pattern = new  RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
			//valido el patrón
			var chequeo=pattern.test(vm.user.email);
			
			if (chequeo){ 																		//si el formato de la dirección de correo es válido...
				if (vm.auth.check == vm.user.clave){											//si las claves ingresadas coinciden...
					vm.dataLoading = true;														//invoca al metodo Create del UserService, que envía una solicitud POST al Tomcat quien interfasea con MongoDB. 
					UserService.Create(vm.user)                                                 //La respuesta se guarda en response.
						.then(function (response) {                                             
							if (response.success) {
								FlashService.Success('Registro correcto', true);
								$location.path('/login');
							} else {
								FlashService.Error(response.message);
								vm.dataLoading = false;
							}
						});
				} else {
					FlashService.Error("Las contraseñas ingresadas no coinciden!");
				}
			} else {
				FlashService.Error("La dirección de correo ingresada es errónea!");
			}
        }
    }

})();

