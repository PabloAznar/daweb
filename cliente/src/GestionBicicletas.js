import React, { useState, useEffect } from "react";
import './bicicletas.css'

function GestionBicicletas() {
  const estacionesMock = [
    { id: 1, nombre: "Estacion 1", codigoPostal: "Codigo1", bicicleta: "Bicicleta 1", estado: "libre" },
    { id: 2, nombre: "Plaza 2", codigoPostal: "Codigo2", bicicleta: "Bicicleta 2", estado: "libre" },
    { id: 3, nombre: "Avenida 3", codigoPostal: "Codigo3", bicicleta: "Bicicleta 3", estado: "libre" },
    { id: 4, nombre: "Calle 4", codigoPostal: "Codigo4", bicicleta: "Bicicleta 4", estado: "libre" },
    { id: 5, nombre: "Sitio 5", codigoPostal: "Codigo5", bicicleta: "Bicicleta 5", estado: "libre" },
    { id: 6, nombre: "Estacion 1", codigoPostal: "Codigo1", bicicleta: "Bicicleta 6", estado: "libre" },
    { id: 7, nombre: "Plaza 2", codigoPostal: "Codigo2", bicicleta: "Bicicleta 7", estado: "libre" },
    { id: 8, nombre: "Avenida 3", codigoPostal: "Codigo3", bicicleta: "Bicicleta 8", estado: "libre" },
    { id: 9, nombre: "Calle 4", codigoPostal: "Codigo4", bicicleta: "Bicicleta 9", estado: "libre" },
    { id: 11, nombre: "Estacion 1", codigoPostal: "Codigo1", bicicleta: "Bicicleta 11", estado: "libre" },
    { id: 12, nombre: "Plaza 2", codigoPostal: "Codigo2", bicicleta: "Bicicleta 12", estado: "libre" },
    { id: 13, nombre: "Estacion 3", codigoPostal: "Codigo3", bicicleta: "Bicicleta 13", estado: "libre" },
  ]

  const [estaciones, setEstaciones] = useState(estacionesMock)

  const [numBikes, setNumBikes] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [partialName, setPartialName] = useState('');

  const handleFilter = () => {
    var estacionesFiltradas = [...estacionesMock]
    estacionesFiltradas = obtenerEstacionesMenosFrecuentes(estacionesFiltradas, numBikes)
    if(postalCode !== '')
    estacionesFiltradas = filtrarPorCodigoPostal(estacionesFiltradas, postalCode)
  if(partialName !== '')
  estacionesFiltradas = filtrarPorNombreParcial(estacionesFiltradas, partialName)
   setEstaciones(estacionesFiltradas)
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
                <th className="bg-primary border">Bicileta</th>
                <th className="bg-primary border">Estado</th>
              </tr>
            </thead>
            <tbody>
              {estaciones.map((estacion) => (
                <tr key={estacion.id}>
                  <td className="border">{estacion.nombre}</td>
                  <td className="border">{estacion.codigoPostal}</td>
                  <td className="border">{estacion.bicicleta}</td>
                  <td className="border">{estacion.estado}</td>
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
