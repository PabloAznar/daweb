const btnIniciarSesion = document.getElementById('btnIniciarSesion');

btnIniciarSesion.addEventListener('click', async(event) => {
    event.preventDefault()
    let correo = document.getElementById("correo").value
    let clave = document.getElementById("clave").value
    const data = JSON.stringify({
        correo: correo,
        clave: clave
      });
    fetch('/users',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar el formulario');
        }
        return response.json()
    })
    .then(data => {
        console.log(JSON.stringify(data[0]))
        localStorage.setItem('usuario', JSON.stringify(data[0]))
        if(data[0].rol === 'GESTOR') {
            window.location.href = "http://localhost:3030/estaciones"
        }
        else {
            window.location.href = "http://localhost:3000/citybike"
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
})