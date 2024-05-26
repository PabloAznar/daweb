const mysql = require('mysql2/promise');
const { connect } = require('../routes/alquiler');

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

async function obtenerAlquilerActivo(connection, idUsuario) {
    const result = await connection.execute("SELECT * FROM ALQUILER WHERE id_usuario = ? AND fecha_fin IS NULL", [idUsuario])
    return result[0]
}

async function obtenerHistorial(connection, idUsuario) {
    let result = await connection.execute("SELECT * FROM ALQUILER WHERE id_usuario = ?",
[idUsuario])
return result[0]
}

async function alquilarBicicleta(connection, idUsuario, usuario, idBicicleta, bicicleta, idEstacion, estacion) {
    return await connection.execute("INSERT INTO ALQUILER SET id_usuario = ?, nombre_usuario = ?, id_bicicleta = ?, nombre_bicicleta = ?, id_estacion = ?, nombre_estacion_origen = ?, fecha_inicio = ?",
[idUsuario, usuario, idBicicleta, bicicleta, idEstacion, estacion, new Date()])
}

async function finalizarAlquiler(connection, id, estacion) {
    return await connection.execute("UPDATE ALQUILER SET fecha_fin = ?, nombre_estacion_destino = ? WHERE id = ?",
[new Date(), estacion, id])
}

exports.getConnection = getConnection
exports.obtenerAlquilerActivo = obtenerAlquilerActivo
exports.obtenerHistorial = obtenerHistorial
exports.alquilarBicicleta = alquilarBicicleta
exports.finalizarAlquiler = finalizarAlquiler