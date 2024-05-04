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

    async function modificarEstacion(connection, id, nombre, capacidad, numeroBicicletas, codigo_postal, fechaAlta) {
        let result = connection.execute("INSERT INTO ESTACION_APARCAMIENTO SET id = ?, nombre = ?, capacidad = ?, numero_bicicletas = ?, codigo_postal = ?, fecha_alta = ?",
  [id, nombre, capacidad, numeroBicicletas, codigo_postal, fechaAlta]);
        return result;
    }

    async function eliminarEstacion(connection, id) {
        connection.execute("DELETE FROM BICICLETA WHERE ESTACION = ?", [id])
        let result = connection.execute("DELETE FROM ESTACION_APARCAMIENTO WHERE id = ?", [id]);
    return result;
    }

    async function obtenerEstaciones(connection) {
        const resultados = await connection.execute("SELECT * FROM ESTACION_APARCAMIENTO")
        return resultados[0]
    }

exports.getConnection = getConnection
exports.registrarEstacion = registrarEstacion
exports.modificarEstacion = modificarEstacion
exports.eliminarEstacion = eliminarEstacion
exports.obtenerEstaciones = obtenerEstaciones