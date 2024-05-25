const reserveButtons = document.querySelectorAll('.reservar-btn');
const usuarioLoggeado = JSON.parse(localStorage.getItem('usuario'));

function comprobarEstadoReservaAlquiler() {
  return new Promise((resolve, reject) => {
    request = new XMLHttpRequest()

    request.onload = () => {
      if (request.status === 200) {
        resolve(request.response)
      } else {
        reject(request.response)
      }
    }

    request.onerror = () => {
      reject(request.response)
    }

    request.open('GET', `http://localhost:3030/users/${usuarioLoggeado.id_usuario}/obtener-reserva-alquiler`, true)
    request.send(null)
  })
}


reserveButtons.forEach(button => {
  button.addEventListener('click', () => {
    const bicicletaId = button.getAttribute('data-id');
    const nombreBicicleta = button.parentNode.parentNode.parentNode.querySelector('#nombre').innerText;
    const nombreEstacion = button.parentNode.parentNode.parentNode.querySelector('#estacion').innerText;
    const idEstacion = document.getElementById('id-estacion').innerText
    comprobarEstadoReservaAlquiler()
      .then(response => {
        return JSON.parse(response)
      })
      .then(data => {
        let reserva = data[0].id_reserva
        let alquiler = data[1].id_alquiler
        if (reserva !== null || alquiler !== null) {
          mostrarPanel()
        } else {
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
        }
      })
      .catch(error => {
        console.log(error)
      })

  });
});

function mostrarPanel() {
  
  const panel = document.getElementById("panel-activo")
  var contenido = `
    <dialog id="modal-reserva-alquiler">
      <h2>Ya tiene una reserva o alquiler activo</h2>
      <div class="mb-3">
                <button id="btnCerrar-reserva-alquiler">Cerrar</button>
            <div>  
    </dialog>
`;
        panel.innerHTML = contenido;
        panel.style.display = 'block';
        const modal = document.querySelector("#modal-reserva-alquiler")
        modal.showModal()

        btnCerrar = document.querySelector("#btnCerrar-reserva-alquiler")
        btnCerrar.addEventListener('click', () => {
            modal.close()
        })
        
}