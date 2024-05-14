import React from "react";


function Header() {
  const usuario = localStorage.getItem('usuario')
  const rol ="USUARIO"
  return (
    <hearder>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary justify-content-center" style={{display:'grid'}}>
            <div>
                {rol === 'GESTOR' ? (
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{paddingLeft: '30vw', paddingRight: '30vw'}}>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3030">Inicio</a>
                            </li>
                            <li class="nav-item">
                            <a className="nav-link" href="http://localhost:3030/estaciones">Gestionar estaciones</a>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link" href="http://localhost:3030">Alta estacion</a>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link" href="http://localhost:3030/altaEstacion.html">Gestionar estaciones</a>
                            </li>
                        </ul>
                        <a href="http://localhost:3030">
                            <button>Cerrar sesion</button>
                        </a>
                    </div>
                ) : (
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{paddingLeft: '20vw', paddingRight: '20vw'}}>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3030">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3000/citybike">Consulta estaciones</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3030/bicicletas/disponibles">Reservar bicicleta</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3030">Consultar reserva activa</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3030">Consultar alquiler activo</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3030">Alquileres previos</a>
                            </li>
                        </ul>
                        <a href="http://localhost:3030">
                            <button>Cerrar sesion</button>
                        </a>
                    </div>
                )}
            </div>
        </nav>
    </hearder>
  );
  }
  
export default Header;