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
    let result = connection.execute("SELECT * FROM RESERVA r")
    return result;
}

async function reservarBicicleta(connection, usuario, bicicleta, estacion, nombreUsuario, nombreBicicleta, nombreEstacion) {
    const fechaInicio = new Date();
    const fechaFin = new Date(fechaInicio.getTime() + 30 * 60 * 1000);

    let result = connection.execute("INSERT INTO RESERVA SET id_usuario = ?, nombre_usuario = ?, id_bicicleta = ?, nombre_bicicleta = ?, id_estacion = ?, nombre_estacion = ?, fecha_inicio = ?, fecha_fin = ?",
[usuario, nombreUsuario, bicicleta, nombreBicicleta, estacion, nombreEstacion, fechaInicio, fechaFin]);
    return result
}

async function formalizarReserva(connection, idReserva) {
    return await connection.execute("UPDATE RESERVA SET formalizada = ?, valida = ? WHERE id_reserva = ?",
    [true, false, idReserva])
}

async function obtenerReservaActiva(connection, idUsuario) {
    const result = await connection.execute("SELECT * FROM RESERVA r JOIN BICICLETA b ON r.id_bicicleta = b.id_bicicleta WHERE id_usuario = ? AND fecha_fin > ? AND formalizada = ? AND valida = ?", [idUsuario, new Date(), false, true])
    return result[0]
}

async function establecerNoValida(connection, idReserva) {
    return await connection.execute("UPDATE RESERVA SET valida = ? WHERE id_reserva = ?", [false, idReserva])
}

async function obtenerHistorial(connection, idUsuario) {
    let result = await connection.execute("SELECT * FROM RESERVA WHERE id_usuario = ?",
[idUsuario])
return result[0];
}

async function cancelarReservasEstacion(connection, idEstacion) {
    return await connection.execute("UPDATE RESERVA SET formalizada = ?, valida = ? WHERE id_estacion = ?", [false, false, idEstacion])
}

exports.getConnection = getConnection
exports.reservarBicicleta = reservarBicicleta
exports.obtenerReservas = obtenerReservas
exports.formalizarReserva = formalizarReserva
exports.obtenerReservaActiva = obtenerReservaActiva
exports.establecerNoValida = establecerNoValida
exports.obtenerHistorial = obtenerHistorial
exports.cancelarReservasEstacion = cancelarReservasEstacion