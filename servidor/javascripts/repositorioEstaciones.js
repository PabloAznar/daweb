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

    async function registrarEstacion(connection, nombre, capacidad, codigo_postal, fechaAlta) {
        let result = connection.execute("INSERT INTO ESTACION_APARCAMIENTO SET nombre = ?, capacidad = ?, numero_bicicletas = ?, codigo_postal = ?, fecha_alta = ?",
  [nombre, capacidad, BICICLETAS_POR_DEFECTO, codigo_postal, new Date()]);

        return result
    }



exports.getConnection = getConnection
exports.registrarEstacion = registrarEstacion