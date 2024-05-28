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

    async function registrarBicicleta(connection, nombre, estacion, nombreEstacion, numeroBicicletas) {
        let result = await connection.execute("INSERT INTO BICICLETA SET nombre = ?, id_estacion = ?, nombre_estacion = ?, reservada = ?, fecha_creacion = ?, numero_reservas = ?",
  [nombre, estacion, nombreEstacion, false, new Date(), 0]);
        return result
    }

    async function obtenerBicicletasByEstacion(connection, idEstacion) {
        let result = await connection.execute("SELECT * FROM BICICLETA WHERE id_estacion = ?", [idEstacion])
        return result[0]
    }

    async function eliminarBicicletasEnEstacion(connection, idEstacion) {
        return await connection.execute("DELETE FROM BICICLETA WHERE id_estacion = ?", [idEstacion])
    }

    async function eliminarBicicletas(connection, idBicicleta, idEstacion, numeroBicicletas) {
        let result = await connection.execute("DELETE FROM BICICLETA WHERE id_bicicleta = ?", [idBicicleta])
        return result;
    }

    async function reservarBicicleta(connection, idBicicleta) {
        let result = connection.execute("UPDATE BICICLETA SET reservada = ?, ultima_reserva = ?, numero_reservas = numero_reservas + 1 WHERE id_bicicleta = ?",
         [true, new Date(), idBicicleta])
        return result;
    }

    async function obtenerBicicletasDisponibles(connection) {
        let result = await connection.execute("SELECT * FROM BICICLETA WHERE reservada = false AND id_estacion IS NOT NULL")
        return result[0]
    }

    async function obtenerBicicletasConReservaCaducada(connection) {
        let result = await connection.execute("SELECT b.id_bicicleta as idBicicleta, r.id_reserva as idReserva FROM BICICLETA B JOIN RESERVA R ON b.id_bicicleta = r.id_bicicleta WHERE r.formalizada = ? and r.valida = ? and r.fecha_fin < ?",
        [false, true, new Date()])
        return result[0]
    }

    async function establecerDisponible(connection, id) {
        return await connection.execute("UPDATE BICICLETA SET reservada = ? WHERE id_bicicleta = ?", [false, id])
    }

    async function obtenerEstacionPorBicicleta(connection, id) {
        let result = await connection.execute("SELECT * FROM ESTACION_APARCAMIENTO e JOIN BICICLETA b ON e.id_estacion = b.id_estacion WHERE b.id_bicicleta = ?",
    [id])
    return result[0]
    }

    async function alquilar(connection, id) {
        return await connection.execute("UPDATE BICICLETA SET reservada = false, id_estacion = NULL, nombre_estacion = NULL WHERE id_bicicleta = ?",
        [id])
    }

    async function aparcarBicicleta(connection, idEstacion, idBicicleta, nombreEstacion) {
        await connection.execute("UPDATE BICICLETA set id_estacion = ?, nombre_estacion = ? WHERE id_bicicleta = ?",
    [idEstacion, nombreEstacion, idBicicleta])
    }

    async function eliminarBicicletasPorEstacion(connection, idEstacion) {
        return await connection.execute("DELETE FROM BICICLETA WHERE id_estacion = ?", idEstacion)
    }

exports.getConnection = getConnection
exports.registrarBicicleta = registrarBicicleta
exports.obtenerBicicletasByEstacion = obtenerBicicletasByEstacion
exports.eliminarBicicletas = eliminarBicicletas
exports.eliminarBicicletasEnEstacion = eliminarBicicletasEnEstacion
exports.reservarBicicleta = reservarBicicleta
exports.obtenerBicicletasDisponibles = obtenerBicicletasDisponibles
exports.obtenerBicicletasConReservaCaducada = obtenerBicicletasConReservaCaducada
exports.establecerDisponible = establecerDisponible
exports.obtenerEstacionPorBicicleta = obtenerEstacionPorBicicleta
exports.alquilar = alquilar
exports.aparcarBicicleta = aparcarBicicleta
exports.eliminarBicicletasPorEstacion = eliminarBicicletasPorEstacion
