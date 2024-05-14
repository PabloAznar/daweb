import React, { useEffect, useState } from "react";

function ReservaBicicletas(props) {
    const { idEstacion } = props.match.params;

    const [bicicletas, setBicicletas] = useState([])

    useEffect(() => {
        fetch(`/bicicletas/estacion/${idEstacion}/info`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            console.log(data)
            setBicicletas(data)
          })
      }, [])
    
    function reservarBicicleta(index) {
        let bicicleta = bicicletas[index];
        if(!bicicleta.reservada) {
            const requestMethod = {
                method: 'PUT',
            };
            fetch(`/bicicletas/${bicicleta.id}/reservar`, requestMethod)
        }
        
    }

    return(
        <div className="row">
        <div className="col">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th className="bg-primary border">Bicicleta</th>
                <th className="bg-primary border">Fecha alta</th>
                <th className="bg-primary border">Ultima reserva</th>
                <th className="bg-primary border">Numero reservas</th>
                <th className="bg-primary border">Reservada</th>
                <th className="bg-primary border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bicicletas.map((bicicleta, index) => (
                <tr key={bicicleta.id}>
                  <td className="border">{bicicleta.nombre}</td>
                  <td className="border">{bicicleta.fecha_alta}</td>
                  <td className="border">{bicicleta.ultima_reserva}</td>
                  <td className="border">{bicicleta.numero_reservas}</td>
                  <td className="border">{bicicleta.reservada ? 'Sí' : 'No'}</td>
                  <td className="border">
                    <button onClick={() => reservarBicicleta(index)} disabled={bicicleta.reservada}>Reservar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default ReservaBicicletas;
