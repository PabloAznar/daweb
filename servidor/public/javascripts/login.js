const btnIniciarSesion = document.getElementById('btnIniciarSesion');

btnIniciarSesion.addEventListener('click', async (event) => {
    event.preventDefault()
    let correo = document.getElementById("correo").value
    let clave = document.getElementById("clave").value
    if (checkFields(correo, clave)) {
        const data = JSON.stringify({
            correo: correo,
            clave: clave
        });
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        })
            .then(response => {
                if (!response.ok) {
                    showErrorMessage()
                }
                return response.json()
            })
            .then(data => {
                localStorage.clear();
                localStorage.setItem('usuario', JSON.stringify(data[0]))
                window.location.href = `http://localhost:3000/usuario/${data[0].id_usuario}`
            })
            .catch(error => {
                console.error('Error:', error);
                showErrorMessage()
            });
    }
})

function showErrorMessage() {
    const errorMessage = document.getElementById("error-login")
    errorMessage.style.display = "block"
}

function checkFields(correo, clave) {
    const expresionCorreo = /\S+@\S+\.\S+/
    let errores = 0;
    if (correo === "") {
        const errorCorreo = document.getElementById("error-correo")
        errorCorreo.style.display = "block"
        errores++;
    } else {
        const errorCorreo = document.getElementById("error-correo")
        errorCorreo.style.display = "none"
    }
     if (correo.match(expresionCorreo)) {
        const errorCorreo = document.getElementById("error-correo")
        errorCorreo.style.display = "none"
    } else {
        const errorCorreo = document.getElementById("error-formato-correo")
        errorCorreo.style.display = "block"
        errores++;
    }
    if (clave === "") {
        const errorClave = document.getElementById("error-clave")
        errorClave.style.display = "block"
        errores++;
    } else {
        const errorClave = document.getElementById("error-clave")
        errorClave.style.display = "none"
    }
    return errores === 0
}