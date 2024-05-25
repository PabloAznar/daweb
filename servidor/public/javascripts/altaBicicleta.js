

const altaBicicletas = document.querySelectorAll('.aniadir-btn');

altaBicicletas.forEach(button => {
    const numeroBicicletas = button.parentNode.parentNode.parentNode.querySelector('#numero_bicicletas').innerText;
    const capacidad = button.parentNode.parentNode.parentNode.querySelector('#capacidad').innerText;
    if(capacidad <= numeroBicicletas) {
        button.disabled = true
    }

})

altaBicicletas.forEach(button => {
    button.addEventListener('click', (event) => {
        const estacion = button.getAttribute('data-id');
        const nombreEstacion = button.parentNode.parentNode.parentNode.querySelector('#nombre').innerText;
        const numeroBicicletas = button.parentNode.parentNode.parentNode.querySelector('#numero_bicicletas').innerText;
        var contenido = `
    <dialog id="modal">
    <h2>Alta bicicleta en estacion ${nombreEstacion}</h2>
        <form id="altaEstacionForm">
            <div class="mb-3">
                <label for="nombreBicicleta" class="form-label">Nombre de la bicicleta</label>
                <input type="text" class="form-control" id="nombreBicicleta" required>
            </div>
            <div class="mb-3">
                <button id="btnAltaBicicleta">Alta bicicleta</button>
                <button id="btnCerrar">Cancelar</button>
            <div>
        </form>
    </dialog>
`;
        var panel = document.getElementById('panel-bicicletas');
        panel.innerHTML = contenido;
        panel.style.display = 'block';
        const modal = document.querySelector("#modal")
        modal.showModal()

        btnCerrar = document.querySelector("#btnCerrar")
        btnCerrar.addEventListener('click', () => {
            modal.close()
        })

        btnRegistrar = document.querySelector("#btnAltaBicicleta")
        btnRegistrar.addEventListener("click", (event) => {
            event.preventDefault()
            const nombre = document.getElementById("nombreBicicleta").value
            const data = JSON.stringify({
                nombre: nombre,
                estacion: Number(estacion),
                nombreEstacion: nombreEstacion,
                numeroBicicletas: Number(numeroBicicletas)
            });
            altaBicicleta(data)
                .then((response) => {
                    fetch(`http://localhost:3030/estaciones/${estacion}`, {
                        method:'PUT',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            numeroBicicletas: Number(numeroBicicletas) + 1,
                        })

                    })
                    .then((response) => {
                        window.location.reload()
                    })
                    .catch((error) => {console.log(error)})
                })
                .catch((error) => console.log(error))
        })
    })

})


async function altaBicicleta(data) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(new Error("Ha ocurrido un error dando de alta la bicicleta"))
            }
        }
        request.onerror = function () {
            reject(new Error("Ha ocurrido un error dando de alta la bicicleta"));
        }

        request.open('POST', 'http://localhost:3030/bicicletas', true)
        request.setRequestHeader('Content-Type', 'application/json');

        request.send(data)

    });
}