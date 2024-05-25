const mysql = require('mysql2/promise');

const BICICLETAS_POR_DEFECTO = 0

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

    async function registrarEstacion(connection, nombre, capacidad, codigo_postal) {
        let result = connection.execute("INSERT INTO ESTACION_APARCAMIENTO SET nombre = ?, capacidad = ?, numero_bicicletas = ?, codigo_postal = ?, fecha_alta = ?",
  [nombre, capacidad, BICICLETAS_POR_DEFECTO, codigo_postal, new Date()]);

        return result
    }

    async function modificarEstacion(connection, nombre, capacidad, codigoPostal, id) {
        let result = connection.execute("UPDATE ESTACION_APARCAMIENTO SET nombre = ?, capacidad = ?, codigo_postal = ? WHERE id_estacion = ? ",
  [nombre, capacidad, codigoPostal, id]);
        return result;
    }

    async function actualizarBicicletas(connection, id, numeroBicicletas) {
        return await connection.execute("UPDATE ESTACION_APARCAMIENTO SET numero_bicicletas = ? WHERE id_estacion = ?",
    [numeroBicicletas, id])
    }

    async function eliminarEstacion(connection, id) {
        return await connection.execute("DELETE FROM ESTACION_APARCAMIENTO WHERE id_estacion = ?", [id]);
    }

    async function obtenerEstaciones(connection) {
        const resultados = await connection.execute("SELECT * FROM ESTACION_APARCAMIENTO")
        return resultados[0]
    }

    async function obtenerEstacionPorId(connection, id) {
        const resultados = await connection.execute("SELECT * FROM ESTACION_APARCAMIENTO WHERE id_estacion = ?", [id])
        return resultados[0]
    }

    async function bajaBicicleta(connection, estacion) {
        return await connection.execute("UPDATE ESTACION_APARCAMIENTO SET numero_bicicletas = ? WHERE id_estacion = ?",
    [estacion.id_estacion, estacion.numero_bicicletas - 1])
    }

    async function obtenerEstacionesDisponibles(connection) {
        let result = await connection.execute("SELECT * FROM ESTACION_APARCAMIENTO WHERE numero_bicicletas < capacidad")
        return result[0]
    }

exports.getConnection = getConnection
exports.registrarEstacion = registrarEstacion
exports.modificarEstacion = modificarEstacion
exports.eliminarEstacion = eliminarEstacion
exports.obtenerEstaciones = obtenerEstaciones
exports.obtenerEstacionPorId = obtenerEstacionPorId
exports.bajaBicicleta = bajaBicicleta
exports.actualizarBicicletas = actualizarBicicletas
exports.obtenerEstacionesDisponibles = obtenerEstacionesDisponibles