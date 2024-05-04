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

exports.getConnection = getConnection
exports.registrarBicicleta = registrarBicicleta