var usuario = JSON.parse(localStorage.getItem('usuario'));

btnFinalizar = document.querySelectorAll(".finalizar-btn")

btnFinalizar.forEach(button => {
    button.addEventListener('click', () => {
        let idAlquiler = button.getAttribute('data-id');
        let idBicicleta = document.getElementById('id-bicicleta').innerText
        fetch("http://localhost:3030/estaciones/plaza/aparcamiento/disponible")
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                var contenido = `
    <dialog id="modal">
    <h2>Estaciones de aparacamiento disponibles</h2>
            <div class="mb-3">
                <select class="form-select" id="estaciones-aparcamiento">
                    <option selected>Seleccione estacion</option>
                </select>
            </div>
            <div class="mb-3">
                <button id="btnFinalizarAlquiler" disabled>Finalizar alquiler</button>
                <button id="btnCerrar">Cancelar</button>
            <div>
    </dialog>
`;
                let panel = document.getElementById('panel-fin')
                panel.innerHTML = contenido;
                var select = document.getElementById('estaciones-aparcamiento');
                data.forEach((estacion) => {
                    var option = document.createElement('option');
                    option.value = estacion.id_estacion;
                    option.text = estacion.nombre;
                    select.appendChild(option);
                });

                panel.style.display = 'block';
                const modal = document.querySelector("#modal")
                modal.showModal()

                const estaciones = document.getElementById('estaciones-aparcamiento')
                const btnFinalizar = document.getElementById('btnFinalizarAlquiler')

                document.getElementById('estaciones-aparcamiento').addEventListener('change', () => {
                    if (estaciones.selectedIndex === 0) {
                        btnFinalizar.disabled = true
                    } else {
                        btnFinalizar.disabled = false
                    }
                })

                btnFinalizar.addEventListener('click', (event) => {
                    event.preventDefault();
                    let estacion = estaciones.options[estaciones.selectedIndex]
                    aparcarBicicleta(estacion.value, idBicicleta, estacion.text)
                    finalizarAlquiler(idAlquiler, usuario.id_usuario, estacion.text)
                })

                btnCerrar = document.querySelector("#btnCerrar")
                    btnCerrar.addEventListener('click', () => {
                        modal.close()
                    })
            })
            .catch((error) => console.log(error))
    })
}) 

async function aparcarBicicleta(idEstacion, idBicicleta, estacion) {
    await fetch(`http://localhost:3030/bicicletas/${idBicicleta}/estacion/${idEstacion}/aparcar`, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            estacion: estacion
        })
    })
}

async function finalizarAlquiler(idAlquiler, idUsuario, estacion) {
    fetch(`http://localhost:3030/alquileres/${idAlquiler}/finalizar`, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            estacionDestino: estacion
        })
    })
    .then((response) => {
        window.location.href = `http://localhost:3030/historial/${idUsuario}`
    });

    btnCerrar = document.querySelector("#btnCerrar")
    btnCerrar.addEventListener('click', () => {
        modal.close()
    })
}