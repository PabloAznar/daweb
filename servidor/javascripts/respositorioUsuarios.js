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
        let result = connection.execute("INSERT INTO USUARIO SET nombre = ?, apellidos = ?, correo = ?, clave = ?, rol = ?  fecha_nacimiento = ?",
  [nombre, apellidos, correo, clave, rol, fechaNacimiento]);

        return result
    }



exports.getConnection = getConnection
exports.registrarUsuario = registrarUsuario