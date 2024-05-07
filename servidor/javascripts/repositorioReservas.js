const mysql = require('mysql2/promise');

async function getConnection() {
    const connection = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "practicas",
            database: "citybike",
        });
    return connection
}

async function obtenerReservas(connection, usuario) {
    let result = connection.execute("SELECT * FROM RESERVA")
    return result;
}

async function reservarBicicleta(connection, usuario, bicicleta) {
    const fechaInicio = new Date();
    const fechaFin = new Date(fechaInicio.getTime() + 30 * 1000);

    let result = connection.execute("INSERT INTO RESERVA SET usuario = ?, bicicleta = ?, fecha_inicio = ?, fecha_fin = ?",
[usuario, bicicleta, fechaInicio, fechaFin]);
    connection.execute("UPDATE ESTACION_APARCAMIENTO SET NUMERO_BICICLETAS = ? WHERE id = ?",
[numeroBicicletas + 1, estacion])
    return result
}

async function formalizarReserva(connection, idReserva) {
    return await connection.execute("UPDATE RESERVA SET FORMALIZADA = ? WHERE id = ?",
    [true, idReserva])
}

exports.getConnection = getConnection
exports.reservarBicicleta = reservarBicicleta
exports.obtenerReservas = obtenerReservas
exports.formalizarReserva = formalizarReserva