(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$http'];
    function HomeController(UserService, $rootScope, $http) {
        var vm = this;

        vm.user = null;
		
        //vm.allUsers = [];
        //vm.deleteUser = deleteUser;

        initController();

        function initController() {
			
			console.log($rootScope.globals.currentUser);
			console.log($rootScope.globals.currentUser.authdata);
			loadCurrentUser();
			checkToken();
            //loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
		
				
		function checkToken(){
			$http.get('http://localhost:8080/api/usuario/token/twitter/email/'+$rootScope.globals.currentUser.username)
				.success(function(data) {
					
					 var sobutton = document.getElementById('sign-out-tw');
					 var sibutton = document.getElementById('sign-in-tw');
					 //muestra el botón de sign-out 
					 
					 sobutton.removeAttribute('hidden');

					 //oculta el botón de sign-in
					 sibutton.setAttribute('hidden', 'true');
					 document.getElementById('msj2').innerHTML="<a href='post.html'>Acceder al Panel de Control de Redes Sociales</a>";
					
				})
				.error(function(data, status) {
				  console.error('Error', status, data);
				});
			
		}
		
/*
        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
*/
    }

})();