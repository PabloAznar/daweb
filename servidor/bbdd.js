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

    async function registrarUsuario(connection, nombre, apellidos, correo, clave, fechaNacimiento) {
        let result = connection.execute("INSERT INTO USUARIOS SET nombre = ?, apellidos = ?, correo = ?, clave = ?, fechaNacimiento = ?",
  [nombre, apellidos, correo, clave, fechaNacimiento]);

        return result
    }


exports.getConnection = getConnection
exports.registrarUsuario = registrarUsuario