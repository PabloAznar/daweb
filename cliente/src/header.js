import React, { useState, useEffect } from "react";
import PopUp from "./PopUp";

function Header() {
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    const [popUp, setPopup] = useState(false);
    const [mensaje, setMensaje] = useState('')
    function gotoReservaActiva() {
        fetch(`/reservas/usuario/${usuario.id_usuario}/activa`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.length === 0) {
                    setMensaje("No tiene ninguna reserva en curso")
                    setPopup(true)
                } else {
                    window.location.href = "http://localhost:3030/reservaActiva.html"
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function gotoAlquilerActivo() {
        fetch(`/alquileres/usuario/${usuario.id_usuario}/activo`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.length === 0) {
                    setMensaje("No tiene ningún alquiler en curso")
                    setPopup(true)
                } else {
                    window.location.href = `http://localhost:3030/alquileres/usuario/${usuario.id_usuario}`
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-center" style={{ display: 'grid' }}>
                <div>
                    {usuario !== null ? (
                        usuario.rol === 'GESTOR' ? (
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ paddingLeft: '30vw', paddingRight: '30vw' }}>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3030">Inicio</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3030/estaciones">Gestionar estaciones</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3030">Alta estación</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3030/altaEstacion.html">Gestionar estaciones</a>
                                    </li>
                                </ul>
                                <a href="http://localhost:3030">
                                    <button>Cerrar sesión</button>
                                </a>
                            </div>
                        ) : (
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ paddingLeft: '20vw', paddingRight: '20vw' }}>
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
                                        <a className="nav-link" style={{ cursor: 'pointer' }} onClick={gotoReservaActiva}>Consultar reserva activa</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ cursor: 'pointer' }} onClick={gotoAlquilerActivo}>Consultar alquiler activo</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3030">Historial</a>
                                    </li>
                                </ul>
                                <a href="http://localhost:3030">
                                    <button>Cerrar sesión</button>
                                </a>
                                <PopUp openModal={popUp} closeModal={() => setPopup(false)} texto={mensaje} />
                            </div>
                        )
                    ) : (
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 my-2 my-lg-0" style={{paddingRight: '75vw'}}>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3030">Inicio</a>
                                    </li>
                                </ul>
                                <div>
                                    <a href="http://localhost:3000/registrar" style={{marginRight: '1.5rem'}}>
                                        <button>Registrate</button>
                                    </a>
                                    <a href="http://localhost:3030/login.html">
                                        <button>Iniciar sesion</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;