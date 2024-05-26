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

btnAltaEstacion.addEventListener('click', (event) => {
    event.preventDefault()
    const nombre = document.getElementById("nombreEstacion").value
    const capacidad = document.getElementById("capacidad").value
    const codigoPostal = document.getElementById("codigoPostal").value
    if (checkFormFields(nombre, capacidad, codigoPostal)) {
        const data = JSON.stringify({
            nombre: nombre,
            capacidad: capacidad,
            codigoPostal: codigoPostal,
        });

        altaEstacion(data)
            .then((response) => {
                window.location.href = "http://localhost:3030/estaciones"
            })
            .catch((error) => {
                console.log(error)
                procesarError()
            })

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
    }
})

function checkFormFields(nombre, capacidad, codigoPostal) {
    let errores = 0;
    if (nombre === "") {
        errores++;
        const panelErrorNombre = document.getElementById("campo-nombre")
        panelErrorNombre.style.display = "block"
    } else {
        const panelErrorNombre = document.getElementById("campo-nombre")
        panelErrorNombre.style.display = "none"
    }
    if (capacidad === "") {
        errores++;
        const panelErrorCapacidad = document.getElementById("campo-capacidad")
        panelErrorCapacidad.style.display = "block"
    } else {
        const panelErrorCapacidad = document.getElementById("campo-capacidad")
        panelErrorCapacidad.style.display = "none"
    }
    if (Number(capacidad) <= 0) {
        errores++;
        const panelErrorValorCapacidad = document.getElementById("campo-valor-capacidad")
        panelErrorValorCapacidad.style.display = "block"
    } else {
        const panelErrorValorCapacidad = document.getElementById("campo-valor-capacidad")
        panelErrorValorCapacidad.style.display = "none"
    }
    if (codigoPostal === "") {
        errores++;
        const panelErrorCodigo = document.getElementById("campo-codigo-postal")
        panelErrorCodigo.style.display = "block"
    } else {
        const panelErrorCodigo = document.getElementById("campo-codigo-postal")
        panelErrorCodigo.style.display = "none"
    }
    return errores === 0;
}

function procesarError() {
    const panelErrorEstacion = document.getElementById("error-estacion")
    panelErrorEstacion.style.display = "block"
}