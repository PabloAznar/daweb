const modificarEstacion = document.querySelectorAll('.modificar-btn');

modificarEstacion.forEach(button => {
    button.addEventListener('click', () => {
        const estacion = button.getAttribute('data-id');
        window.location.href = `http://localhost:3000/estacion/modificar/${estacion}`
    })
})
