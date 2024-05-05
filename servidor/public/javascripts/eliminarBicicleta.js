const deleteButtons = document.querySelectorAll('.eliminar-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bicicletaId = button.getAttribute('data-id');
            fetch(`/bicicletas/${bicicletaId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();

                } else {
                    console.error('Error al eliminar la bicicleta.');
                }
            })
            .catch(error => {
                console.error('Error de red:', error);
            });
            
        });
    });
    