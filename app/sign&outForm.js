import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider, 
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

// CREAR USUARIO EN FIREBASE 

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential)

    // Close the signup modal
    const signupModal = document.querySelector('#signupModal');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    // reset the form
    signUpForm.reset();

    // show welcome message
    showMessage("Welcome" + userCredential.user.email);

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Email already in use", "error")
    } else if (error.code === 'auth/invalid-email') {
      showMessage("Invalid email", "error")
    } else if (error.code === 'auth/weak-password') {
      showMessage("Weak password", "error")
    } else if (error.code) {
      showMessage("Something went wrong", "error")
    }
  }

});


// ENTRAR A FIREBASE CON USUARIO CREADO

const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)

    // Close the login modal
    const modal = bootstrap.Modal.getInstance(signInForm.closest('.modal'));
    modal.hide();

    // reset the form
    signInForm.reset();

    // show welcome message
    showMessage("Welcome" + userCredentials.user.email);
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      showMessage("Wrong password", "error")
    } else if (error.code === 'auth/user-not-found') {
      showMessage("User not found", "error")
    } else {
      showMessage("Something went wrong", "error")
    }
  }
});


// SALIR DE FIREBASE 

const logout = document.querySelector("#logout");

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth)
    console.log("signup out");
  } catch (error) {
    console.log(error)
  }
});



//INGRESAR  Y SALIR CON FACEBOOK

const facebookButton = document.querySelector('#facebookLogin');

facebookButton.addEventListener('click', async e => {
  e.preventDefault();

  const provider = new FacebookAuthProvider();

  try {
    const credentials = await signInWithPopup(auth, provider)
    console.log(credentials);
    console.log("facebook sign in");
    
    // Close the login modal
    const modal = bootstrap.Modal.getInstance(facebookButton.closest('.modal'));
    modal.hide();

    // show welcome message
    showMessage("Welcome" + credentials.user.email);
  } catch (error) {
    console.log(error);
  }

})


//INGRESAR  Y SALIR CON GOOGLE

const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const provider = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provider)
    console.log(credentials);
    console.log("google sign in");
    
    // Close the login modal
    const modalInstance = bootstrap.Modal.getInstance(googleButton.closest('.modal'));
    modalInstance.hide();

    // show welcome message
    showMessage("Welcome " + credentials.user.displayName);
  } catch (error) {
    console.log(error);
  }
});




//JS LILO PARA INTEGRAR 


//CHEQUEA SI E EXISTE USERS
console.log("-Controlando si existe users en el LocalStorage-")
if(localStorage.getItem('users')){
    var users = JSON.parse(localStorage.getItem('users'))
    console.log("-Users SI existe :), cargando el array users con el array users-" + users)
}else{
    users = []
    console.log("-Users NO existe :(, creando el array users y guardándolo en el localStorage")
    obtParaLocalStorage = JSON.stringify(users)
    nombreVarLocalStorage = "users" 
    actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage) 
}

//CHEQUEA SI EXISTE LOGIN
console.log("-Controlando si existe login en el LocalStorage-")
if(localStorage.getItem('login')){
    datossesionGuardado = JSON.parse(localStorage.getItem('login'))
    
    console.log("-login SI existe :), cargando el obj datossesionGuardado con el obj login-" + datossesionGuardado)

}else{
    console.log("-login NO existe :(, creando el obj datossesionGuardado y guardándolo en el localStorage")
    var datossesionGuardado = {
        username: '',
        password: ''
    }

    obtParaLocalStorage = JSON.stringify(datossesionGuardado)
    nombreVarLocalStorage = "login" 
    actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage) 

    alert('Para ingresar tenés que inicar sesión. Si todavia no tenés usuarios registrate.')
    window.location = "index.html"  

}


// se carga en todas los html menos en index 
const modalPerfil = 
`<div class = "card">
<h5>TU PERFIL</h5>
<div>
    <div>
        <label><strong>ID User</strong></label>
        <div id="userIdPerfil"></div>
    </div>
    <div>
        <label><strong>Tipo de Usuario</strong></label>
        <div id="userTipoPerfil"></div>
    </div>
    <div>
        <label><strong>Apellido</strong></label>
        <div id="userApellidoPerfil"></div>
    </div>
    <div>
        <label><strong>Nombre</strong></label>
        <div id="userNombrePerfil"></div>
    </div>
    <div>
        <label><strong>E-mail</strong></label>
        <div id="userEmailPerfil"></div>
    </div>
    <div>
        <label><strong>Telefono</strong></label>
        <div id="userTelefonoPerfil"></div>
    </div>
    <div>
        <label><strong>Pass</strong></label>
        <div id="userClavePerfil"></div>
    </div>
</div>
<div >
    <button type="button" class="btn btn-secondary"onclick = "cerrarSesion()" ><i class="fa-solid fa-right-from-bracket"></i></button>
</div>
</div>`


function abrilModalPerfil(){
    modalGenericoContenido.innerHTML = modalPerfil 
    modalGenerico.showModal()
    mostrarperfil()   
}


function mostrarperfil(){
    //obtener todos los datos del usuario sacandolos de 
    console.log(users)
    console.log("-"+document.getElementById('userSesion').textContent+"-")
    users.map( usuario => {
        if( usuario.username === document.getElementById('userSesion').textContent  ){
            document.getElementById("userIdPerfil").innerHTML = usuario.id
            document.getElementById("userTipoPerfil").innerHTML = usuario.tipoUser
            document.getElementById("userApellidoPerfil").innerHTML = usuario.apellido
    document.getElementById("userNombrePerfil").innerHTML = usuario.nombre
    document.getElementById("userEmailPerfil").innerHTML = usuario.mail
    document.getElementById("userTelefonoPerfil").innerHTML = usuario.telefono
    document.getElementById("userClavePerfil").innerHTML = usuario.password
        }
    })
}

//////// INDEX LOGIN ///////////////////
    // try{
      if(document.getElementById("username")){
        formLoginUsername = document.getElementById("username")
        formLoginPassword = document.getElementById("password")

        formLoginUsername.value = datossesionGuardado.username
        formLoginPassword.value = datossesionGuardado.password
        }
    // }catch(error){
    //     console.log('En esta pagina no hay form login' + error)
    // }

    //var button = document.getElementById("entrar")
    //var formLogin = document.getElementById("login")

    var usuarioSesion, passwordSesion , datalogin
    function entrarSesion(){
        console.log('-Chequeando si login coincide con usuario guardado-')
        users.map(usuario =>{
        if(usuario.username === formLoginUsername.value && usuario.password === formLoginPassword.value ){      
            usuarioSesion = usuario.username
            passwordSesion = usuario.password 
        }
        })

        if(username.value === usuarioSesion && password.value === passwordSesion){
            
            console.log('-Coincide, entrando a html tableros :) -')
            datossesionGuardado = {
            username: formLoginUsername.value,
                password: formLoginPassword.value
            }
            var obtParaLocalStorage = JSON.stringify(datossesionGuardado)
            var nombreVarLocalStorage = "login" 
            actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage) 
           
            window.location = "index-tableros.html";

        }else{

         console.log('-No Coincide :(, limpiando form logi y avisando x alert-')
            alert("Los datos son incorrectos")
            formLoginUsername.value = ""
            formLoginPassword.value = ""
        }
    }
    
    document.getElementById('userSesion').textContent = datossesionGuardado.username

    function sinSecionActiva(){
        alert('Para trabajar en lilo tenés que iniciar una sesión. si no tenes usuarios registrate en la pagina de Bienvenida con el form Registrate.')
        window.location.href = "index.html"
        
    }


    function cerrarSesion(){
        
        datossesionGuardado = {
            username: '',
            password: ''
        }
        obtParaLocalStorage = JSON.stringify(datossesionGuardado)
        nombreVarLocalStorage = "login" 
        actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage) 
        
        console.log('-Cerrando sesión de usuarioSesion :(. Limpiando obj datossesionGuardado, hecho!')
        window.location = "index.html";
    }


try{ 
 
 //ESTO ES UN FORMULARIO PARA REGISTRAR UN USUARIO, GUARDAR  SUS DATOS EN EL LOCALSTORAGE Y ENTRAR AL HTML INDEX-TABLEROS

function creaUser(){ 
   
    formCrearUser = document.getElementsByName("formCrearUser")
     buttonCrearUser = document.getElementById("crear")
     userApellido = document.getElementById('userApellido')
     userNombre = document.getElementById('userNombre')
     userEmail = document.getElementById('userEmail')
     userTelefono = document.getElementById('userTelefono')
     userClave = document.getElementById('userClave')
     userRClave = document.getElementById('userRClave')

    //validaciones de campos del form registro de usuarios.
    if(userApellido.value == 0 ){
        alert("El campo Apellido es obligatorio")
    }else if (userNombre.value == 0){
        alert("El campo Nombre es obligatorio")
    }else if (userEmail.value == 0){
        alert("El campo Email es obligatorio")
    }else if (userTelefono.value == 0){
        alert("El campo Teléfono es obligatorio")
    }else if(userClave.value == 0){
        alert("El campo Clave es obligatorio")
    }else if (userClave.value != userRClave.value ){
        alert("las claves deben coincidir")
    }else{

    dataUserNuevo = {
    id: Date.now(),
    apellido: userApellido.value,
    nombre: userNombre.value,
    mail: userEmail.value,
    telefono: userTelefono.value,
    username: userEmail.value,
    password: userClave.value,
    color: '#77aaff',
    tipoUser: 'ADMINISTRADXR'
    }

    users.push(dataUserNuevo)

    var obtParaLocalStorage = JSON.stringify(users)
    var nombreVarLocalStorage = "users" 
    actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage)

    datossesionGuardado = {
        username: dataUserNuevo.username,
        password: dataUserNuevo.password
    }
    var obtParaLocalStorage = JSON.stringify(datossesionGuardado)
    var nombreVarLocalStorage = "login" 
    actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage)

    
    alert("Los datos fueron guardados con éxito, ya puedés ingresar a Lilo, bienvenido!!"+
    "\nGuardá tus tus datos de ingreso:\nUsuario: "+
    userEmail.value+",\nPassword:"+userClave.value)

    //limpia el form
    userApellido.value = ''
    userNombre.value = ''
    userEmail.value = ''
    userTelefono.value = ''
    userEmail.value = ''
    userClave.value = ''
    noEliminar() // cierra el modal

    window.location = "index-tableros.html";
    }
}

const modalRegistrarUsuario = ` 
<div class="modal-content">
        <div class="modal-header">
            <h3>Crea tu Usuario</h3>
            <spam>Completar todos los campos.</spam>
        </div>
        <form name = "formCrearUser" id="crearUser">
            <div class="form-group">
                <label for="userApellido" class="col-form-label">Apellido:</label>
                <input type="text"  class="form-control"  name="userApellido" placeholder="Escribe tu Apellido" id="userApellido">
            </div>
            <div class="form-group">
                <label for="userNombre" class="col-form-label">Nombres:</label>
                <input type="text" class="form-control"  name="userNombre" placeholder="Escribe tu/s Nombres" id="userNombre">
            </div>
            <div class="form-group">
                <label for="userEmail" class="col-form-label">E-mail:</label>
                <input type="email" class="form-control" name="userEmail" placeholder="Escribe tu E-mail" id="userEmail">
            </div>
            <div class="form-group">
                <label for="userTelefono" class="col-form-label">Telefono:</label>
                <input type="text" max="10" min="10" class="form-control"  name="userTelefono" placeholder="Escribe tu telefono" id="userTelefono">
            </div>
            <div class="form-group">
                <label for="userClave" class="col-form-label">Clave:</label>
                <input type="password" class="form-control" name="userClave" placeholder="Escribe tu clave" id="userClave">
            </div>
            <div class="form-group">
                <label for="userRClave" class="col-form-label">Repetir Clave:</label>
                <input type="password" class="form-control"  name="userRClave" placeholder="Escribe tu clave" id="userRClave">
            </div>
        </form>
    <div>
     
        <button type="button"  onclick = "creaUser()" class="btn btn-primary">Crear Usuario</button>
    </div>
    </div>
`

const modalOlvidasteClave = `<div >
<div class="mb-3">
    <h3 class="col-form-label">
    SERVICIO INHABILITADO TEMPORALMENTE
    </h3>
    <div class="col-form-label" >
        Por el momento esta web no está conectado a un servicio de mail. Si no recuedas tu datos te invitamos a que generes un nuevo usuario.  
    </div> 
</div></div>`


const modalQueEs = `<div class="card">
<p>Lilo facilita el seguimiento de las tareas que realizan un equipo de trabajo.</p>
<p>Está basado en el método de Kanban, en donde las tareas se agrupan en tres grandes estados: Que hacer, Haciendo y Hecho; permitiendo al equipo visualizar gráficamente el flujo de trabajo de un proyecto, viendo cuales son las tareas pendientes, las que se están realizando y las que ya han sido concluidas; el sistema busca optimizar el rendimiento del tu tiempo y el de tu equipo.</p>
</div></div>`

// abre modalRegistrarUsuario
if(document.querySelector("#btn-abrir-modal-RegistroUsuario")){
const btnAbrirModalRU = document.querySelector("#btn-abrir-modal-RegistroUsuario")
btnAbrirModalRU.addEventListener("click",()=>{
    modalGenericoContenido.innerHTML = modalRegistrarUsuario
    modalGenerico.showModal()
})
}

// abre modal Olvide clave 
if(document.querySelector("#btn-abrir-modal-OlvidasteUsuario")){
const btnAbrirModalOU = document.querySelector("#btn-abrir-modal-OlvidasteUsuario")
btnAbrirModalOU.addEventListener("click",()=>{
    modalGenericoContenido.innerHTML = modalOlvidasteClave
    modalGenerico.showModal()
})
}
// abre modal que es lilo
if(document.querySelector("#btn-abrir-modal-QueEs")){
const btnAbrirModalQE = document.querySelector("#btn-abrir-modal-QueEs")
btnAbrirModalQE.addEventListener("click",()=>{
    modalGenericoContenido.innerHTML = modalQueEs
    modalGenerico.showModal()
})
}

}catch (error){
        console.log ("No se Obtubieron datos de usuario del localStorage. No se cargó el fomr Login" + error)
}


////////// FIN LOGIN ////////////