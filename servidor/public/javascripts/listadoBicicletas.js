const listadoBicicletas = document.querySelectorAll('.listado-btn');

listadoBicicletas.forEach(button => {
    button.addEventListener('click', () => {
        const estacion = button.getAttribute('data-id');
        fetch(`/bicicletas/estacion/${estacion}`, {
            method: 'GET'
        })
    })
})
