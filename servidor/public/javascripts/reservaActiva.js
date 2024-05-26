let datosReserva
var usuario = JSON.parse(localStorage.getItem('usuario'));

fetch(`/reservas/usuario/${usuario.id_usuario}/activa`)
.then((response) => {
    return response.json()
})
.then((data)=> {
    datosReserva = data
    const tbody = document.querySelector('table tbody');

data.forEach((datosReserva, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${datosReserva.nombre}</td>
    <td>${datosReserva.nombre_estacion}</td>
    <td>${datosReserva.fecha_inicio}</td>
    <td>${datosReserva.fecha_fin}</td>
    <td>
      <button class="btn btn-primary" onclick="alquilarBicicleta(${index})">Alquilar</button>
    </td>
  `;

    tbody.appendChild(row);
});
})
.catch((error)=> {
    console.log(error)
})

function alquilarBicicleta(index) {
    let datoReserva = datosReserva[index]
    let data = JSON.stringify({
        'idUsuario' : datoReserva.id_usuario,
        'usuario': usuario.nombre,
        'idBicicleta': datoReserva.id_bicicleta,
        'bicicleta': datoReserva.nombre_bicicleta,
        'idEstacion': datoReserva.id_estacion,
        'estacion': datoReserva.nombre_estacion
    })
    console.log(datoReserva)
    formalizarReserva(datoReserva.id_reserva)
    .then((response) => {
        crearAlquiler(data)
        .then((response) => {
            window.location.href = `http://localhost:3030/alquileres/usuario/${usuario.id_usuario}`
        })
        .catch((error) => console.log(error))
    })
    .catch((error) => {
        console.log(error)
    })

    
     
}

async function formalizarReserva(idReserva) {
   return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();

    request.open('PUT',`http://localhost:3030/reservas/${idReserva}`, true);

    request.onload = function () {
        if (request.status === 200) {
            resolve(request.response);
        } else {
            reject(new Error("Ha ocurrido un error formalizando la reserva"))
        }
    }
    request.onerror = function () {
        reject(new Error("Ha ocurrido un error formalizando la reserva"));
    }
    request.send(null);
});
}

async function crearAlquiler(bicicleta) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.open('POST','http://localhost:3030/alquileres', true);

        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(new Error("Ha ocurrido un error alquilando la bicicleta"))
            }
        }
        request.onerror = function () {
            reject(new Error("Ha ocurrido un error alquilando la bicicleta"));
        }
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(bicicleta);
    });
}