async function altaEstacion(data) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(new Error("Ha ocurrido un error dando de alta la estacion"))
            }
        }
        request.onerror = function () {
            reject(new Error("Ha ocurrido un error dando de alta la estacion"));
        }

        request.open('POST', 'http://localhost:3030/estaciones', true)
        request.setRequestHeader('Content-Type', 'application/json');

        request.send(data)

    });
}


var btnAltaEstacion = document.getElementById("btnAltaEstacion");

btnAltaEstacion.addEventListener('click', async (event) => {
    event.preventDefault()
    const nombre = document.getElementById("nombreEstacion").value
    const capacidad = document.getElementById("capacidad").value
    const codigoPostal = document.getElementById("codigoPostal").value
    const data = JSON.stringify({
        nombre: nombre,
        capacidad: capacidad,
        codigoPostal: codigoPostal,
    });

    altaEstacion(data)
        .then((response) => {
            console.log(response)
            window.location.href = "http://localhost:3030/estaciones"
        })
        .catch((error) => console.log(error))

    /*
        fetch("http://localhost:3030/estaciones", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: data
            
        })
        .then((response) => {
            window.location.href = "http://localhost:3030/estaciones"
        })
        .catch((error) => {
            console.log(error)
        })
        */
})