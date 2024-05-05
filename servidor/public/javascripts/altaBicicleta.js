

const altaBicicletas = document.querySelectorAll('.aniadir-btn');

altaBicicletas.forEach(button => {
    button.addEventListener('click', () => {
        const estacion = button.getAttribute('data-id');
        const nombreEstacion = button.parentNode.parentNode.parentNode.querySelector('#nombre').innerText;
        const numeroBicicletas = button.parentNode.parentNode.parentNode.querySelector('#numero_bicicletas').innerText;
    var contenido = `
    <dialog id="modal">
    <h2>Alta bicicleta en estacion ${nombreEstacion}</h2>
        <form id="altaEstacionForm">
            <div class="mb-3">
                <label for="nombreBicicleta" class="form-label">Nombre de la bicicleta</label>
                <input type="text" class="form-control" id="nombreBicicleta" required>
            </div>
            <button id="btnAltaBicicleta" type = submit class="btn btn-primary">Registrar bicicleta</button>
        </form>
    </dialog>
`;
    // Mostrar el panel
    var panel = document.getElementById('panel');
    panel.innerHTML = contenido;
    panel.style.display = 'block';
    const modal = document.querySelector("#modal")
    modal.showModal()
    btnRegistrar = document.querySelector("#btnAltaBicicleta")
    btnRegistrar.addEventListener("click", () => {
    const nombre = document.getElementById("nombreBicicleta").value
    const data = JSON.stringify({
        nombre: nombre,
        estacion: Number(estacion),
        numeroBicicletas : Number(numeroBicicletas)
      }); 
        var request = new XMLHttpRequest(); 
        request.open('POST', 'http://localhost:3030/bicicletas', true)
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(data)
        window.location.reload();
    })
    })
   
})
