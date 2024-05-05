async function altaEstacion(data) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest(); 
        request.open('POST', 'http://localhost:3030/estaciones', true)
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(data)
    })
}


var btnAltaEstacion = document.getElementById("btnAltaEstacion");

btnAltaEstacion.addEventListener('click', async(event) => {
    const nombre = document.getElementById("nombreEstacion").value
    const capacidad = document.getElementById("capacidad").value
    const codigoPostal = document.getElementById("codigoPostal").value
    const data = JSON.stringify({
        nombre: nombre,
        capacidad: capacidad,
        codigoPostal: codigoPostal,
      });
    await altaEstacion(data);
})