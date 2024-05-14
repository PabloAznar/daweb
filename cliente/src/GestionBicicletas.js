import React, { useState, useEffect } from "react";
import './bicicletas.css'

function GestionBicicletas() {

  const [estaciones, setEstaciones] = useState([])
  const [estacionesCopia, setEstacionesCopia] = useState([])

  useEffect(() => {
    fetch('/estaciones/all/info')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setEstaciones(data)
        setEstacionesCopia(data)
      })
  }, [])

  const [numBikes, setNumBikes] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [partialName, setPartialName] = useState('');

  const handleFilter = () => {
    var estacionesFiltradas = [...estaciones]
    estacionesFiltradas = obtenerEstacionesMenosFrecuentes(estacionesFiltradas, numBikes)
    if (postalCode !== '')
      estacionesFiltradas = filtrarPorCodigoPostal(estacionesFiltradas, postalCode)
    if (partialName !== '')
      estacionesFiltradas = filtrarPorNombreParcial(estacionesFiltradas, partialName)
    setEstacionesCopia(estacionesFiltradas)
  };

  function obtenerEstacionesMenosFrecuentes(filtroEstaciones, numeroBicicletas) {
    const estacionesAgrupadas = filtroEstaciones.reduce((acc, estacion) => {
      const nombreEstacion = estacion.nombre;
      acc[nombreEstacion] = (acc[nombreEstacion] || 0) + 1;
      return acc;
    }, {});
    return filtroEstaciones.filter(estacion => numeroBicicletas <= estacionesAgrupadas[estacion.nombre])
  }

  function filtrarPorCodigoPostal(filtroEstaciones, codigo) {
    return filtroEstaciones.filter(estacion => estacion.codigoPostal === codigo)
  }

  function filtrarPorNombreParcial(filtroEstaciones, nombre) {
    return filtroEstaciones.filter(estacion => estacion.nombre.includes(nombre));

  }

  return (
    <div className="container">
      <div className="navigation-bar">
        <input
          type="text"
          placeholder="Número de bicicletas"
          value={numBikes}
          onChange={(e) => setNumBikes(e.target.value)}
        />
        <input
          type="text"
          placeholder="Código Postal"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre parcial"
          value={partialName}
          onChange={(e) => setPartialName(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th className="bg-primary border">Estacion</th>
                <th className="bg-primary border">Código postal</th>
                <th className="bg-primary border">Capacidad</th>
                <th className="bg-primary border">Numero bicicletas</th>
                <th className="bg-primary border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estacionesCopia.map((estacion) => (
                <tr key={estacion.id}>
                  <td className="border">{estacion.nombre}</td>
                  <td className="border">{estacion.codigo_postal}</td>
                  <td className="border">{estacion.capacidad}</td>
                  <td className="border">{estacion.numero_bicicletas}</td>
                  <td className="border">
                    <a href={`/estaciones/${estacion.id}/bicicletas`}>
                      <button>Ver bicicletas</button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GestionBicicletas;
