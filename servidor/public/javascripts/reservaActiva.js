
const bicicletas = [
    { id: 3, nombre: 'Bici1', estacionOrigen: 'Estacion1', inicio: '2024-05-01', fin: '2024-05-02', reservada: true },
];

const tbody = document.querySelector('table tbody');

bicicletas.forEach((bicicleta, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${bicicleta.nombre}</td>
    <td>${bicicleta.estacionOrigen}</td>
    <td>${bicicleta.inicio}</td>
    <td>${bicicleta.fin}</td>
    <td>
      <button onclick="alquilarBicicleta(${index})">Alquilar</button>
    </td>
  `;

    tbody.appendChild(row);
});

function alquilarBicicleta(index) {
    let bicicleta = bicicletas[index]
    formalizarReserva(bicicleta.id)
     
}

async function formalizarReserva(idReserva) {
   await makeAjaxCall(`http://localhost:3030/reservas/${idReserva}`, 'PUT')
}

async function crearAlquiler() {

}

async function makeAjaxCall(url, methodType) {
    var promiseObj = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(methodType, url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var resp = xhr.responseText;
                    var respJSON = JSON.parse(resp);
                    resolve(respJSON);
                } else {
                    reject(xhr.status);
                }
            }
        }
    });
    return promiseObj;
}