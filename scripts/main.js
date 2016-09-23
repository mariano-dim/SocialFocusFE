//Creo el proveedor de autenticaci�n para Google
var provider = new firebase.auth.GoogleAuthProvider();

//googleSignin: Funci�n para loguearse a Google a trav�s de un pop-up (ahora se loguea a una cuenta fija que es la que esta fijada en Firebase)
//En caso de error lo registra en la consola de javascript (hay que verla a trav�s de las Herramientas de desarrollo de los navegadores, o bien con Firebug para Firefox o Chrome)
//De momento imprime en la p�gina los valores de acceso.
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

//googleSignout: Funci�n para hacer signout de Google (por ahora no funciona del todo bien porque la sesi�n queda abierta)
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
}

//Defino proveedor para autencaci�n en Twitter
var provider2 = new firebase.auth.TwitterAuthProvider();


//twitterSignin: Mismo caso que googleSignin, pero para twitter
function twitterSignin() {
   firebase.auth().signInWithPopup(provider2).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
	  var secret = result.credential.secret;
	   var userPic = document.getElementById('user-pic-tw');
	  var userName = document.getElementById('user-name-tw');
	  var sobutton = document.getElementById('sign-out-tw');
	  var sibutton = document.getElementById('sign-in-tw');
	  
	  setPic(userName,userPic,sobutton,sibutton);
		
      document.getElementById("msj").innerHTML+="Acceso con Twitter satisfactorio!<br /><br /><strong>Access Token:</strong> "+token+" <br /><strong>Secret:</strong> "+secret+"<br /><br />";
   }).catch(function(error) {
      console.log(error.code)
      console.log(error.message)
   });
}

//twitterSignout: Funci�n para hacer signout de Google (por ahora no funciona del todo bien porque la sesi�n queda abierta)
function twitterSignout() {
   firebase.auth().signOut()
   
   .then(function() {
      console.log('Signout successful!')
	  var userPic = document.getElementById('user-pic-tw');
	  var userName = document.getElementById('user-name-tw');
	  var sobutton = document.getElementById('sign-out-tw');
	  var sibutton = document.getElementById('sign-in-tw');
	  
	  unSetPic(userName,userPic,sobutton,sibutton);
   }, function(error) {
      console.log('Signout failed!')
   });
   
   document.getElementById("msj").innerHTML="";
}


//setPic: Funci�n que personaliza el bot�n para que figuren el avatar y el nombre de usuario de la red social que corresponda al login. Resta pulir.
function setPic(user,pic,so,si){
	
	//tomar los valores que interesan: Foto y Nombre.
	
		var profilePicUrl = user.photoURL; 
		var userName = user.displayName;
		
	//volcar valores en bot�n
		pic.style.backgroundImage = 'url(' + profilePicUrl + ')';
		user.textContent = userName;

	//muestra el bot�n de sign-out 
		user.removeAttribute('hidden');
		pic.removeAttribute('hidden');
		so.removeAttribute('hidden');

	//oculta el bot�n de sign-in
		si.setAttribute('hidden', 'true');
}

//unSetPic: Funci�n que vuelve a mostrar el bot�n de Sign In para volverse a loguear.
function unSetPic(user,pic,so,si){

	//oculta el bot�n de sign-out
	user.setAttribute('hidden', 'true');
	pic.setAttribute('hidden', 'true');
	so.setAttribute('hidden', 'true');

	//muestra el bot�n de sign-in 
	si.removeAttribute('hidden');

}