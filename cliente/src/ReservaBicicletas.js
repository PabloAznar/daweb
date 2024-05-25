import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";

function ReservaBicicletas(props) {
  const { idEstacion } = props.match.params;
  const usuarioLoggeado = JSON.parse(localStorage.getItem('usuario'));

  const [bicicletas, setBicicletas] = useState([])
  const [popUp, setPopup] = useState(false);
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    fetch(`/bicicletas/estacion/${idEstacion}/info`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setBicicletas(data)
      })
  }, [])

  function reservarBicicleta(index) {
    fetch(`/users/${usuarioLoggeado.id_usuario}/obtener-reserva-alquiler`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        let reserva = data[0].id_reserva
        let alquiler = data[1].id_alquiler
        if (reserva !== null || alquiler !== null) {
          setMensaje("Ya tiene una reserva o alquiler en curso")
          setPopup(true)
        } else {
          let bicicleta = bicicletas[index];
          fetch('/reservas', {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
              idUsuario: usuarioLoggeado.id_usuario,
              usuario: usuarioLoggeado.nombre,
              idBicicleta: bicicleta.id_bicicleta,
              bicicleta: bicicleta.nombre,
              idEstacion: bicicleta.id_estacion,
              estacion: bicicleta.nombre_estacion
            })
          })
            .then((response) => {
              fetch(`/bicicletas/${bicicleta.id_bicicleta}/reservar`, {
                method: 'PUT',
                headers: new Headers({
                  'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                  usuario: usuarioLoggeado.nombre,
                  bicicleta: bicicleta.nombre,
                  estacion: bicicleta.id_estacion,
                  nombre_estacion: bicicleta.nombre_estacion
                })
              })
                .then((response) => {
                  window.location.reload();
                })
                .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
        }
      })
  }

  return (
    <div className="row">
      <div className="col">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th className="bg-primary border">Bicicleta</th>
              <th className="bg-primary border">Fecha alta</th>
              <th className="bg-primary border">Ultimo alquiler</th>
              <th className="bg-primary border">Numero alquileres</th>
              <th className="bg-primary border">Reservada</th>
              <th className="bg-primary border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bicicletas.map((bicicleta, index) => (
              <tr key={bicicleta.id_bicicleta}>
                <td className="border">{bicicleta.nombre}</td>
                <td className="border">{bicicleta.fecha_creacion}</td>
                <td className="border">{bicicleta.ultimo_alquiler}</td>
                <td className="border">{bicicleta.numero_reservas}</td>
                <td className="border">{bicicleta.reservada ? 'Sí' : 'No'}</td>
                <td className="border">
                  <button onClick={() => reservarBicicleta(index)} disabled={bicicleta.reservada}>Reservar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PopUp openModal={popUp} closeModal={() => setPopup(false)} texto={mensaje} />
      </div>
    </div>
  )
}

export default ReservaBicicletas;
