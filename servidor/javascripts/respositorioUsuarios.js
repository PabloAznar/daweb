const mysql = require('mysql2/promise');

const rol = "USUARIO"

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

    async function registrarUsuario(connection, nombre, apellidos, correo, clave, fechaNacimiento) {
        let result = connection.execute("INSERT INTO USUARIO SET nombre = ?, apellidos = ?, correo = ?, clave = ?, rol = ?, fecha_nacimiento = ?",
  [nombre, apellidos, correo, clave, rol, fechaNacimiento]);

        return result
    }

    async function obtenerUsuario(connection, id) {
        const result = await connection.execute("SELECT * FROM USUARIO WHERE id_usuario = ?", [id])
        return result[0]
    }

    async function obtenerUsuarioPorCorreoClave(connection, correo, clave) {
        let result = await connection.execute("SELECT * FROM USUARIO WHERE correo = ? AND clave = ?", [correo, clave]);
        return result[0]
    }

    async function obtenerReservaActiva(connection, idUsuario) {
        let result = await connection.execute("SELECT r.id_reserva FROM USUARIO u LEFT JOIN RESERVA r ON u.id_usuario = r.id_usuario WHERE r.valida = true AND u.id_usuario = ?",
    [idUsuario])
        return result[0]
    }

    async function obtenerAlquilerActivo(connection, idUsuario) {
        let result = await connection.execute("SELECT a.id as id_alquiler FROM USUARIO u LEFT JOIN ALQUILER a ON u.id_usuario = a.id_usuario WHERE a.fecha_fin IS NULL AND u.id_usuario = ?",
    [idUsuario])
        return result[0]
    }

exports.getConnection = getConnection
exports.registrarUsuario = registrarUsuario
exports.obtenerUsuario = obtenerUsuario
exports.obtenerUsuarioPorCorreoClave = obtenerUsuarioPorCorreoClave
exports.obtenerReservaActiva = obtenerReservaActiva
exports.obtenerAlquilerActivo = obtenerAlquilerActivo