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

    async function obtenerBicicletasByEstacion(connection, idEstacion) {
        let result = await connection.execute("SELECT * FROM BICICLETA WHERE estacion = ?", [idEstacion])
        return result[0]
    }

    async function eliminarBicicletas(connection, idBicicleta) {
        let result = connection.execute("DELETE FROM BICICLETA WHERE ID = ?", [idBicicleta])
        return result;
    }

    async function reservarBicicleta(connection, idBicicleta) {
        let result = connection.execute("UPDATE BICICLETA SET RESERVADA = ? WHERE ID = ?", [true, idBicicleta])
        return result;
    }

    async function obtenerBicicletasDisponibles(connection) {
        let result = await connection.execute("SELECT * FROM BICICLETA WHERE reservada = false")
        return result[0]
    }

exports.getConnection = getConnection
exports.registrarBicicleta = registrarBicicleta
exports.obtenerBicicletasByEstacion = obtenerBicicletasByEstacion
exports.eliminarBicicletas = eliminarBicicletas
exports.reservarBicicleta = reservarBicicleta
exports.obtenerBicicletasDisponibles = obtenerBicicletasDisponibles