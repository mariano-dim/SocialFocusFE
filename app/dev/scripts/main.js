/*
//Creo el proveedor de autenticación para Google
var provider = new firebase.auth.GoogleAuthProvider();


//googleSignin: Función para loguearse a Google a través de un pop-up (ahora se loguea a una cuenta fija que es la que esta fijada en Firebase)
//En caso de error lo registra en la consola de javascript (hay que verla a través de las Herramientas de desarrollo de los navegadores, o bien con Firebug para Firefox o Chrome)
//De momento imprime en la página los valores de acceso.
function googleSignin() {
   firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
	  var userPic = document.getElementById('user-pic-gg');
	  var userName = document.getElementById('user-name-gg');
	  var sobutton = document.getElementById('sign-out-gg');
	  var sibutton = document.getElementById('sign-in-gg');
	  
	  setPic(userName,userPic,sobutton,sibutton);
	  
	  document.getElementById("msj").innerHTML="Acceso con Google Satisfactorio!<br /><br /><strong>Access Token:</strong> "+token+"<br /><br />";
      
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}

//googleSignout: Función para hacer signout de Google (por ahora no funciona del todo bien porque la sesión queda abierta)
function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
	  var userPic = document.getElementById('user-pic-gg');
	  var userName = document.getElementById('user-name-gg');
	  var sobutton = document.getElementById('sign-out-gg');
	  var sibutton = document.getElementById('sign-in-gg');
	  
	  unSetPic(userName,userPic,sobutton,sibutton);
   }, function(error) {
      console.log('Signout Failed')  
   });
   document.getElementById("msj").innerHTML="";
}*/

//Defino proveedor para autencación en Twitter
var provider2 = new firebase.auth.TwitterAuthProvider();


//twitterSignin: Mismo caso que googleSignin, pero para twitter
function twitterSignin() {
   firebase.auth().signInWithPopup(provider2).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user.displayName;
	  var userPic = result.user.photoURL;
	  var secret = result.credential.secret;
	  //var userPic = document.getElementById('user-pic-tw');
	  //var userName = document.getElementById('user-name-tw');
	  var sobutton = document.getElementById('sign-out-tw');
	  var sibutton = document.getElementById('sign-in-tw');
	  
	  //setPic(userName,userPic,sobutton,sibutton);
	  setPic(sobutton,sibutton);
		
      //document.getElementById("msj").innerHTML="Acceso a Twitter satisfactorio!<br /><br /><strong>Access Token:</strong> "+token+" <br /><strong>Secret:</strong> "+secret+"<br /><br />";
	 $('#msj').html("Acceso a Twitter satisfactorio!<br /><br /><strong>Access Token:</strong> "+token+" <br /><strong>Secret:</strong> "+secret+"<br /><br />");
	 
	  //TEST
	 var userSF = $('#tt').val(); 
	 var datos = {}
	 datos["email"] = userSF;
	 datos["socialnetwork"]= "Twitter";
	 datos["usuariors"]= user;
	 datos["fotors"]= userPic;
	 datos["token"]= token;
	 datos["secret"]= secret;
	 
	 $.ajax({
		 type: "POST",
		 contentType: "application/json",
		 url: "http://localhost:8080/api/usuario/push",
		 data: JSON.stringify(datos),
		 dataType: 'json',
		 timeout: 600000,
		 success:  function(data){
			$('#msj2').html("<a href='post.html'>Acceder al Panel de Control de Redes Sociales</a>");
		 },
		 error: function(e) {
			 $('#msj2').html("Carga token fallo");
		 }
	 });
	 
	 //MEGA TEST - Traer Twits
	 /*var twits = [];
	
	 $.ajax({
		 type: "GET",
		 //url: "http://localhost:8080/api/tweets/email/" + userSF,
		 url: "http://localhost:8080/api/tweets/UserTimeline/_" + user +"?email="+ userSF,
		 dataType: 'json',
		 timeout: 600000,
		 success:  function(resp){
			twits=resp;
			 var content="";
			for (i = 0; i<=twits.length-1;i++){
				content += "<img src='"+twits[i].user.profileImageURL+"' align='left' /><strong>"+twits[i].user.name+"</strong><br /><br />"+twits[i].text+"<br /> <br />";
			}
	 
			$('#msj').html(content);
			$('#msj2').html('');
			
		 },
		 error: function(e) {
			 $('#msj2').html("Obtencion de Twitters fallo");
		 }
	 });*/
	 	   	  
   }).catch(function(error) {
      console.log(error.code)
      console.log(error.message)
   });
}

//OBTENER TWEETS PROPIOS

function ownTweets(){
	var twits = [];
	
	 $.ajax({
		 type: "GET",
		 url: "http://localhost:8080/api/tweets/UserTimeline/_" + user +"?email="+ userSF,
		 dataType: 'json',
		 timeout: 600000,
		 success:  function(resp){
			twits=resp;
			 var content="";
			for (i = 0; i<=twits.length-1;i++){
				content += "<img src='"+twits[i].user.profileImageURL+"' align='left' /><strong>"+twits[i].user.name+"</strong><br /><br />"+twits[i].text+"<br /> <br />";
			}
	 
			$('#msj').html(content);
			$('#msj2').html('');
			
		 },
		 error: function(e) {
			 $('#msj2').html("Obtencion de Twitters fallo");
		 }
	 });
}

//OBTENER TIMELINE GENERAL
function getTimeline(){
	
	var twits = [];
	
	 $.ajax({
		 type: "GET",
		 url: "http://localhost:8080/api/tweets/email/" + userSF,
		 dataType: 'json',
		 timeout: 600000,
		 success:  function(resp){
			twits=resp;
			 var content="";
			for (i = 0; i<=twits.length-1;i++){
				content += "<img src='"+twits[i].user.profileImageURL+"' align='left' /><strong>"+twits[i].user.name+"</strong><br /><br />"+twits[i].text+"<br /> <br />";
			}
	 
			$('#msj').html(content);
			$('#msj2').html('');
			
		 },
		 error: function(e) {
			 $('#msj2').html("Obtencion de Twitters fallo");
		 }
	 });
	
}

//twitterSignout: Función para hacer signout de Google (por ahora no funciona del todo bien porque la sesión queda abierta)
function twitterSignout() {
   firebase.auth().signOut()
   
   .then(function() {
      console.log('Signout successful!')
	  //var userPic = document.getElementById('user-pic-tw');
	  //var userName = document.getElementById('user-name-tw');
	  var sobutton = document.getElementById('sign-out-tw');
	  var sibutton = document.getElementById('sign-in-tw');
	  
	  //unSetPic(userName,userPic,sobutton,sibutton);
	  unSetPic(sobutton,sibutton);
	  
	  //borrar token de base
	  var userSF = $('#tt').val();
	  $.ajax({
		 type: "DELETE",
		 url: "http://localhost:8080/api/usuario/token/" + userSF,
		 success:  function(data){
			$('#msj2').html("Borrado token OK");
		 },
		 error: function(e) {
			 $('#msj2').html("Borrado token fallo");
		 }
	 });
	  
   }, function(error) {
      console.log('Signout failed!')
   });
   
   document.getElementById("msj").innerHTML="";
}


//setPic: Función que personaliza el botón para que figuren el avatar y el nombre de usuario de la red social que corresponda al login. Resta pulir.
//function setPic(user,pic,so,si){
function setPic(so,si){
	
	//tomar los valores que interesan: Foto y Nombre.
	
		//var profilePicUrl = user.photoURL; 
		//var userName = user.displayName;
		
	//volcar valores en botón
		//pic.style.backgroundImage = 'url(' + profilePicUrl + ')';
		//user.textContent = userName;

	//muestra el botón de sign-out 
		//user.removeAttribute('hidden');
		//pic.removeAttribute('hidden');
		so.removeAttribute('hidden');

	//oculta el botón de sign-in
		si.setAttribute('hidden', 'true');
}

//unSetPic: Función que vuelve a mostrar el botón de Sign In para volverse a loguear.
//function unSetPic(user,pic,so,si){
function unSetPic(so,si){

	//oculta el botón de sign-out
	//user.setAttribute('hidden', 'true');
	//pic.setAttribute('hidden', 'true');
	so.setAttribute('hidden', 'true');

	//muestra el botón de sign-in 
	si.removeAttribute('hidden');

}