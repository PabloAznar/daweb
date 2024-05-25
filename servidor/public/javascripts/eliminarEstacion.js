async function eliminarEstacion(id) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('DELETE', `http://localhost:3030/estaciones/${id}`, true)
        request.send(null)
    })
}

const deleteButtons = document.querySelectorAll('.eliminar-btn');

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const estacionId = button.getAttribute('data-id');

        fetch(`http://localhost:3030/bicicletas/estacion/${estacionId}`, {
            method: 'DELETE'
        }).then((response) =>
            fetch(`/estaciones/${estacionId}`, {
                method: 'DELETE'
            })
                .then(response => {
                        window.location.reload();
                })
                .catch(error => {
                    console.error('Error al eliminar las bicicleta de la estacion');
                }))
            .catch((error) => { console.log(error) })

    });
});