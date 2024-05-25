const reserveButtons = document.querySelectorAll('.reservar-btn');
const usuarioLoggeado = JSON.parse(localStorage.getItem('usuario'));


reserveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bicicletaId = button.getAttribute('data-id');
            const nombreBicicleta = button.parentNode.parentNode.parentNode.querySelector('#nombre').innerText;
            const nombreEstacion = button.parentNode.parentNode.parentNode.querySelector('#estacion').innerText;
            const idEstacion = document.getElementById('id-estacion').innerText

            fetch('/reservas', {
                method: 'POST',
                headers: new Headers({
                  'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                  idUsuario: usuarioLoggeado.id_usuario,
                  usuario: usuarioLoggeado.nombre,
                  idBicicleta: bicicletaId,
                  bicicleta: nombreBicicleta,
                  idEstacion: idEstacion,
                  estacion: nombreEstacion
                })
                })
                .then((response) => {
                  fetch(`/bicicletas/${bicicletaId}/reservar`, {
                    method: 'PUT',
                  })
                  .then((response)=> {
                    window.location.reload();
                  })
                  .catch((error) => console.log(error))
                })
                .catch((error) => console.log(error))
    });
});