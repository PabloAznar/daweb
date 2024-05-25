async function cancelarReservas(url, method) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();

        request.onload = () => {
            if(request.status === 200) {
                resolve(request.response)
            } else {
                reject(request.response)
            }
        }

        request.onerror = () => {
            reject(request.response)
        }

        request.open(method, url, true)
        request.send(null)
    })
}

const deleteButtons = document.querySelectorAll('.eliminar-btn');

deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const estacionId = button.getAttribute('data-id');
        
    await cancelarReservas(`http://localhost:3030/reservas/estacion/${estacionId}`, 'PATCH') 
    await cancelarReservas(`http://localhost:3030/bicicletas/estacion/${estacionId}`, 'DELETE') 

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