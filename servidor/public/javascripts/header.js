var usuario = undefined
if(localStorage.getItem('usuario') !== null && localStorage.getItem('usuario') !== 'undefined') {
    usuario = JSON.parse(localStorage.getItem('usuario'));
}
var headerItem = document.getElementById("header-container")
var navContent

if (usuario === null || usuario === undefined) {
    navContent = `
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 my-2 my-lg-0" style="padding-right: 75vw">
                <li class="nav-item">
                    <a class="nav-link"  href="http://localhost:3030">Inicio</a>
                </li>
            </ul>
            <div>
                <a href="http://localhost:3000/registrar" style="margin-right: 1.5rem">
                    <button class="btn btn-secondary">Registrate</button>
                </a>
                <a href="http://localhost:3030/login.html">
                    <button class="btn btn-secondary">Iniciar sesion</button>
                </a>
            </div>    
        </div>
    </div>
    `
} else if (usuario.rol === "GESTOR") {
    navContent = `
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 my-2 my-lg-0"  style="padding-left: 30vw;padding-right: 30vw">
                <li class="nav-item">
                    <a class="nav-link"  href="http://localhost:3030">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"  href="http://localhost:3030/estaciones">Gestionar estaciones</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"  href="http://localhost:3030/altaEstacion.html">Alta estacion</a>
                </li>
            </ul>
            <a href="http://localhost:3000/logout">
                <button class="btn btn-secondary" id="btnCerrarSesion">Cerrar sesion</button>
            </a>
        </div>
    </div>
    `
} else {
    navContent = `
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 my-2 my-lg-0"  style="padding-left: 20vw;padding-right: 20vw">
                <li class="nav-item">
                    <a class="nav-link"  href="http://localhost:3030">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="http://localhost:3000/citybike">Consulta estaciones</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="http://localhost:3030/bicicletas/disponibles">Reservar bicicleta</a>
                </li>
                <li class="nav-item">
                    <a id="link-reserva" class="nav-link" style="cursor: pointer;">Consultar reserva activa</a>
                </li>
                <li class="nav-item">
                    <a id="link-alquiler" class="nav-link" style="cursor: pointer;">Consultar alquiler activo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="http://localhost:3030/historial/${usuario.id_usuario}">Historial</a>
                </li>
            </ul>
            <a href="http://localhost:3000/logout">
                <button class="btn btn-secondary" id="btnCerrarSesion">Cerrar sesion</button>
            </a>
        </div>
    </div>
    <div id="panelEnlances"></div>
    `
}

var navItem = `
<header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary justify-content-center" style="display:grid">
        ${navContent}
    </nav>
</header>
`

headerItem.innerHTML = navItem;

var btnCerrarSesion = document.getElementById("btnCerrarSesion")

if (usuario.rol === "USUARIO"){
    let linkReserva = document.getElementById('link-reserva')
    linkReserva.addEventListener('click', () => {
        fetch(`/reservas/usuario/${usuario.id_usuario}/activa`)
        .then((response) => {
            return response.json()
        })
        .then((data)=> {
            if(data.length === 0) {
                generarPopUp("No tiene ninguna reserva en curso")
            } else {
                window.location.href = "http://localhost:3030/reservaActiva.html"
            }
        })
        .catch((error)=> {
            console.log(error)
        })
    })

    let linkAlquiler = document.getElementById('link-alquiler')
    linkAlquiler.addEventListener('click', () => {
        fetch(`/alquileres/usuario/${usuario.id_usuario}/activo`)
        .then((response) => {
            return response.json()
        })
        .then((data)=> {
            if(data.length === 0) {
                generarPopUp("No tiene ningún alquiler en curso")
            } else {
                window.location.href = `http://localhost:3030/alquileres/usuario/${usuario.id_usuario}`
            }
        })
        .catch((error)=> {
            console.log(error)
        })
    })
}

function generarPopUp(textPopup) {
    var contenido = `
    <dialog id="modal" style="position: absolute;">
        <h3>${textPopup}</h3>
        <div style="margin-top: 2rem;">
            <button class="btn btn-primary" id="btnCerrarPopUp" style="cursor: pointer;">Cerrar</button>
        <div>
    </dialog>
    `;

    var panel = document.getElementById('panelEnlances');
    panel.innerHTML = contenido;
    panel.style.display = 'block';
    const modal = document.querySelector("#modal")
    modal.showModal()
        
    btnCerrar = document.querySelector("#btnCerrarPopUp")
    btnCerrar.addEventListener('click', () => {
        modal.close()
    })
}