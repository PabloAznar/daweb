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

    async function registrarBicicleta(connection, nombre, estacion, numeroBicicletas) {
        let result = connection.execute("INSERT INTO BICICLETA SET nombre = ?, estacion = ?, reservada = ?, fecha_alta = ?",
  [nombre, estacion, false, new Date()]);
        connection.execute("UPDATE ESTACION_APARCAMIENTO SET NUMERO_BICICLETAS = ? WHERE id = ?",
    [numeroBicicletas + 1, estacion])
        return result
    }

    async function obtenerBicicletas(connection, idEstacion) {
        let result = await connection.execute("SELECT * FROM BICICLETA ")
        return result[0]
    }

    async function eliminarBicicletas(connection, idBicicleta) {
        let result = connection.execute("DELETE FROM BICICLETA WHERE ID = ?", [idBicicleta])
    }

exports.getConnection = getConnection
exports.registrarBicicleta = registrarBicicleta
exports.obtenerBicicletas = obtenerBicicletas
exports.eliminarBicicletas = eliminarBicicletas