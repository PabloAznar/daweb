var usuario = JSON.parse(localStorage.getItem('usuario'));
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
                    <button>Registrate</button>
                </a>
                <a href="http://localhost:3030/login.html">
                    <button>Iniciar sesion</button>
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
            <a href="http://localhost:3030">
                <button id="btnCerrarSesion">Cerrar sesion</button>
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
                    <a class="nav-link" href="http://localhost:3030">Consultar reserva activa</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="http://localhost:3030">Consultar alquiler activo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="http://localhost:3030">Alquileres previos</a>
                </li>
            </ul>
            <a href="http://localhost:3030">
                <button id="btnCerrarSesion">Cerrar sesion</button>
            </a>
        </div>
    </div>
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

btnCerrarSesion.addEventListener('click', () => {
    localStorage.clear();
})

