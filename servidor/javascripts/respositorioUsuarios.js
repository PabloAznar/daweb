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

exports.getConnection = getConnection
exports.registrarUsuario = registrarUsuario
exports.obtenerUsuario = obtenerUsuario
exports.obtenerUsuarioPorCorreoClave = obtenerUsuarioPorCorreoClave