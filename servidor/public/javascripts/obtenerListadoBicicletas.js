const params = new URLSearchParams(window.location.search);
const id = params.get('id');
            
fetch(`http://localhost:3030/bicicletas/estacion/${id}`)
.then((response) => {
    return response.json()
})
.then((data) => {
    const h1 = document.getElementById('titulo')
    if(data.length === 0) {
        h1.textContent = "Aún no hay bicicletas en la estación"
        const divpaginacion = document.getElementById('paginacion')
        divpaginacion.style.display = 'none';
        
    } else {
        h1.textContent = "Bicletas en estacion: " + data[0].nombre_estacion
        agregarDatosTabla(data)
    }
})
.catch((error) => {
    console.log(error)
})

function agregarDatosTabla(data) {
    const filas = 5;
    let paginaActual = 1;

    function renderTable(pagina, data) {
        const tableBody = document.getElementById('tabla-bicicletas');
        tableBody.innerHTML = '';
        
        createTableHeader(tableBody)
        
        const inicio = (pagina - 1) * filas;
        const fin = inicio + filas;
        const bicicletasPaginadas = data.slice(inicio, fin);

        bicicletasPaginadas.forEach(bicicleta => {
            const row = document.createElement('tr');

            const columnaBicicleta = document.createElement('td');
            columnaBicicleta.textContent = bicicleta.nombre;
            row.appendChild(columnaBicicleta);

            const columnaUltimaReserva = document.createElement('td');
            columnaUltimaReserva.textContent = bicicleta.ultima_reserva;
            row.appendChild(columnaUltimaReserva);

            const columnaReservas = document.createElement('td');
            columnaReservas.textContent = bicicleta.numero_reservas;
            row.appendChild(columnaReservas);

            const columnaReservada = document.createElement('td');
            columnaReservada.textContent = bicicleta.reservada;
            row.appendChild(columnaReservada);

            const columnaCreacion = document.createElement('td');
            columnaCreacion.textContent = bicicleta.fecha_creacion;
            row.appendChild(columnaCreacion);

            const columnaAcciones = document.createElement('td');
            const btnGroup = document.createElement('div');
            btnGroup.classList.add('btn-group-vertical');
            
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'eliminar-btn');
            btnEliminar.textContent = 'Dar de baja';
            btnEliminar.setAttribute('data-id', bicicleta.id_estacion);
            btnEliminar.addEventListener('click', () => {
                eliminarBicicleta(bicicleta.id_bicicleta)
                .then((response) => {
                    fetch(`http://localhost:3030/estaciones/${bicicleta.id_estacion}`, {
                        method:'PUT',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            numeroBicicletas: data.length - 1,
                        })

                    })
                    .then((response) => {
                        window.location.reload()
                    })
                    .catch((error) => {console.log(error)})
                })
                .catch((error) => {console.log(error)})
            })

            btnGroup.appendChild(btnEliminar);
            if (bicicleta.reservada) {
                btnEliminar.disabled = true;
            }

            columnaAcciones.appendChild(btnGroup);
            row.appendChild(columnaAcciones);

            tableBody.appendChild(row);
        });

        document.getElementById('info-paginacion').textContent = `Bicicletas ${pagina} a ${fin} de ${data.length}`;
    }

    function createTableHeader(tableBody) {
        const headerRow = document.createElement('tr')

        const columnaBicicleta = document.createElement('th')
        columnaBicicleta.textContent = "Biclicleta"
        headerRow.appendChild(columnaBicicleta)

        const columnaUltimaReserva = document.createElement('th')
        columnaUltimaReserva.textContent = "Última reserva"
        headerRow.appendChild(columnaUltimaReserva)

        const columnaReservas = document.createElement('th')
        columnaReservas.textContent = "Número reservas"
        headerRow.appendChild(columnaReservas)

        const columnaReservada = document.createElement('th')
        columnaReservada.textContent = "Número reservas"
        headerRow.appendChild(columnaReservada)

        const columnaCreacion = document.createElement('th')
        columnaCreacion.textContent = "Fecha creación"
        headerRow.appendChild(columnaCreacion)

        const columnaAcciones = document.createElement('th')
        columnaAcciones.textContent = "Acciones"
        headerRow.appendChild(columnaAcciones)

        tableBody.appendChild(headerRow);
    }

    async function eliminarBicicleta(id) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest()

            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(new Error("Ha ocurrido un error eliminando la bicicleta"))
                }
            }
            request.onerror = function () {
                reject(new Error("Ha ocurrido un error eliminando la bicicleta"))
            }
    
            request.open('DELETE', `http://localhost:3030/bicicletas/${id}`, true)

            request.send(null)
        })
    }

    function siguiente() {
        if (paginaActual > 1) {
            paginaActual--;
            renderTable(paginaActual, data);
        }
    }

    function anterior() {
        if (paginaActual * filas < data.length) {
            paginaActual++;
            renderTable(paginaActual, data);
        }
    }

    document.getElementById('prev-page').addEventListener('click', siguiente);
    document.getElementById('next-page').addEventListener('click', anterior);
    renderTable(paginaActual, data);
}