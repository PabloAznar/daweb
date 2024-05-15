const panelReservas = document.getElementById('panelReservas')
const panelAlquileres = document.getElementById('panelAlquileres')

const btnReservas = document.getElementById('reserva-btn')
const btnAlquileres = document.getElementById('alquiler-btn')

btnReservas.addEventListener('click', () => {
    panelReservas.style.display = 'block';
    panelAlquileres.style.display = 'none';
    })

btnAlquileres.addEventListener('click', () => {
    panelReservas.style.display = 'none';
    panelAlquileres.style.display = 'block';
    })
