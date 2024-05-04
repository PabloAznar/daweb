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

            fetch(`/estaciones/${estacionId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();

                } else {
                    console.error('Error al eliminar la estación.');
                }
            })
            .catch(error => {
                console.error('Error de red:', error);
            });
            
        });
    });