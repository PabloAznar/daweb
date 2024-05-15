const listadoBicicletas = document.querySelectorAll('.listado-btn');

listadoBicicletas.forEach(button => {
    button.addEventListener('click', () => {
        const estacion = button.getAttribute('data-id');
        window.location.href = "http://localhost:3030/bicicletas/estacion/${estacion}"
    })
})
