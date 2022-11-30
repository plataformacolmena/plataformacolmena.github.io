///////// USUARIOS ////////////////////

var modalUsuarioAgregado = `<div class ="card2" ><p> Usuario agregado!.</p></div>`

var modalPanleUsuarios = `<div ><p> Estás en el panel de usuarios. Acá podés cargar, ver y editar los miembros que participen de los tableros. Para agregar y editar es necesario que completes todos los campos. El color que elijas será para que lo identifiques más facilmente en los tableros.
                    </p>
</div>`


var modalUsuarioEditado = `<div class='card2'><p> Usuario editado!.</p></div>`

function abrilModalPanelUsuarios(){ 
    modalGenericoContenido.innerHTML =   modalPanleUsuarios
    modalGenerico.showModal()
}

   

    let editando = false;

    if(document.getElementById("frmUsers")){

    var $formUsers = document.getElementById("frmUsers")
    // const $btnSave = document.getElementById("btnSave")

    
    const $btnAdd = document.getElementById("btnAddUser")

    const $usersApi = document.getElementById('importarUsuarios')


    var usuariosGuardados = JSON.parse(localStorage.getItem('users'))

    
    // try{
        
        if(document.querySelector(".listaUsers")){
            mostrarUsers()
        
        const dataUserNuevo = {
            id: '',
            apellido: '',
            nombre: '',
            mail:  '',
            telefono:'',
            username:'',
            password:'',
            color: '',
            tipoUser:''   
        }

        
        // PARA CREAR MIEMBROS EN PANTALLA USUARIOS      
        $btnAdd.addEventListener("click", () => {
            if($formUsers.formUserNewNombre.value === "" || $formUsers.formUserNewApellido.value === "" || $formUsers.formUserNewEmail.value === "" ||
                $formUsers.formUserNewTelefono.value === "" || $formUsers.formUserNewColor.value === "" || $formUsers.formUserNewTipoUsuario.value === "" 
                ){
                alert("Complete los campos")
                return
            }
            if(editando){
                editarUser()
                modalGenericoContenido.innerHTML =   modalUsuarioEditado
                modalGenerico.showModal()

                editando = false

            }else{
            
                dataUserNuevo.id= Date.now(),
                dataUserNuevo.apellido= $formUsers.formUserNewApellido.value.toUpperCase(),
                dataUserNuevo.nombre= $formUsers.formUserNewNombre.value.toUpperCase(),
                dataUserNuevo.mail= $formUsers.formUserNewEmail.value,
                dataUserNuevo.telefono = $formUsers.formUserNewTelefono.value,
                dataUserNuevo.username = $formUsers.formUserNewEmail.value,
                dataUserNuevo.password =  'falta',
                dataUserNuevo.color = $formUsers.formUserNewColor.value,
                dataUserNuevo.tipoUser =  $formUsers.formUserNewTipoUsuario.value    

                agregarUser()

                modalGenericoContenido.innerHTML =   modalUsuarioAgregado
                modalGenerico.showModal()
            }

            document.querySelector('.form-user').classList.toggle('show');

        })

    function agregarUser(){
        users.push({...dataUserNuevo})
        var obtParaLocalStorage = JSON.stringify(users)
        var nombreVarLocalStorage = "users" 
        actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage)

        mostrarUsers()
        $formUsers.reset()
        limpiarObjUser()
        
    }

    function limpiarObjUser(){
        dataUserNuevo.id = ''
        dataUserNuevo.apellido = ''
        dataUserNuevo.nombre = ''
        dataUserNuevo.mail = ''
        dataUserNuevo.telefono = ''
        dataUserNuevo.username = ''
        dataUserNuevo.password = ''
        dataUserNuevo.color = ''
        dataUserNuevo.tipoUser = ''
    }
    
    pruebadeArreglo = []
    dataUserFetch = {
        id: '',
        apellido: '',
        nombre: '',
        mail: '',
        telefono: '',
        username: '',
        password: '',
        color: '',
        tipoUser: ''
    }

    $usersApi.addEventListener("click", () => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(usersApi =>     
        usersApi.forEach( usuario => {
            const{id, name,username, email } = usuario  

            dataUserNuevo.id = id
            dataUserNuevo.apellido = username 
            dataUserNuevo.nombre = name
            dataUserNuevo.mail = email
            dataUserNuevo.telefono = "99"
            dataUserNuevo.username = email
            dataUserNuevo.password = '1234'
            dataUserNuevo.color = '#77aaff'
            dataUserNuevo.tipoUser = 'MIEMBRX'
                    users.push({...dataUserNuevo})
                    var obtParaLocalStorage = JSON.stringify(users)
        var nombreVarLocalStorage = "users" 
        actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage)
        mostrarUsers()
        limpiarObjUser()
            }))
        .catch((error) => {console.log(error)})
        
        alert('Usuarios Importados. los datos fueron importados desde: https://jsonplaceholder.typicode.com/users' )
        })
    function avisarEliminarUsuarios(){


        modal = `
        <div>
        <div class="card">
        <p> ¿Estás seguro que querés eliminar todos los usuarios cargados en Lilo?</p>
        </div>
        <div>
        <button type="button" class=""  onclick = "eliminarUsuarios()">Eliminar</button>
        </div>
        </div>`
        modalGenericoContenido.innerHTML =   modal
        modalGenerico.showModal()
    }

    function eliminarUsuarios(){
        users = []
        limpiarHTML()
        mostrarUsers()
        var obtParaLocalStorage = JSON.stringify(users)
        var nombreVarLocalStorage = "users" 
        actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage)
        modalGenerico.close()
    }


    function mostrarUsers(){
        limpiarHTML()
        const $divElements = document.querySelector(".listaUsers")
        users.forEach( usuario =>{
            const {id, apellido, nombre, mail, telefono, username, tipoUser, color } = usuario
            const $div = document.createElement("div")
            $div.classList.add("card")
            $div.draggable = true
            $div.innerHTML = 
            `<div>${tipoUser}</div><div><i class="fa-solid fa-fingerprint"></i>${id}</div>
            <div class="cardUserName" style="background:${color};"><i class="fa-solid fa-person-half-dress"></i>-<strong>${nombre}-${apellido}</strong></div>
            <div><i class="fa-solid fa-envelope"></i>-${mail}</div>
            <div><i class="fa-solid fa-user"></i>-${username}</div>
            <div><i class="fa-solid fa-phone"></i>-${telefono}</div>`

            const btnEditar = document.createElement('button')
            btnEditar.onclick = () => cargarUser(usuario)
            btnEditar.textContent = 'Editar'
            btnEditar.classList.add('btn-editar')
            $div.append(btnEditar)

            const btnEliminar = document.createElement('button')
            btnEliminar.onclick = () => eliminarUser(id)
            btnEliminar.textContent = 'Eliminar'
            btnEliminar.classList.add('btn-editar')
            $div.append(btnEliminar)
 
            $divElements.appendChild($div)
        })

      


    }
    
    function cargarUser(usuario){
        const {id, apellido, nombre, mail, telefono, username, tipoUser, color } = usuario

        $formUsers.formUserNewNombre.value = nombre
        $formUsers.formUserNewApellido.value = apellido
        $formUsers.formUserNewEmail.value = mail
        $formUsers.formUserNewTelefono.value = telefono
        $formUsers.formUserNewColor.value = color
        $formUsers.formUserNewTipoUsuario.value = tipoUser

        dataUserNuevo.id = id

        $btnAdd.textContent = "Actualizar"
        editando = true
    }
    
    function  editarUser(){

        dataUserNuevo.nombre = $formUsers.formUserNewNombre.value.toUpperCase()
        dataUserNuevo.apellido = $formUsers.formUserNewApellido.value.toUpperCase()
        dataUserNuevo.mail = $formUsers.formUserNewEmail.value 
        dataUserNuevo.telefono =  $formUsers.formUserNewTelefono.value 
        dataUserNuevo.color = $formUsers.formUserNewColor.value 
        dataUserNuevo.tipoUser = $formUsers.formUserNewTipoUsuario.value 

        users.map( usuario => {
            if(usuario.id === dataUserNuevo.id){

                usuario.id = dataUserNuevo.id
                usuario.tipoUser = dataUserNuevo.tipoUser
                usuario.apellido = dataUserNuevo.apellido
                usuario.nombre = dataUserNuevo.nombre
                usuario.mail = dataUserNuevo.mail
                usuario.telefono = dataUserNuevo.telefono
                usuario.username = dataUserNuevo.mail
                usuario.color = dataUserNuevo.color
            }
        })

        var obtParaLocalStorage = JSON.stringify(users)
        var nombreVarLocalStorage = "users" 
        actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage)


        // limpiarHTML()
        mostrarUsers()
        $formUsers.reset()
        
        $btnAdd.textContent = "Agregar"
        editando = true
    }

function eliminarUser(id){

    document.querySelector("#modal-generico-contenido").innerHTML = `<div><p>¿Estás seguro que querés eliminar este Usuario?</p><button type="button" onclick="siEliminar(${id})">Eliminar</button></div>`
    document.querySelector("#modal-generico").showModal()
}



// noEliminar

function siEliminar(id){
        users = users.filter(usuario => usuario.id !== id)
        modalGenerico.close()
        console.log(users)
        var obtParaLocalStorage = JSON.stringify(users)
        var nombreVarLocalStorage = "users" 
        actualizarLocalStorage(nombreVarLocalStorage,obtParaLocalStorage)

        limpiarHTML()
        mostrarUsers()

}


function limpiarHTML() {
    const $divElements = document.querySelector(".listaUsers")
  if($divElements.firstChild){
    while($divElements.firstChild){
        $divElements.removeChild($divElements.firstChild)
    }
}
}

}
}
