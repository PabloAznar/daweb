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
        //let result = connection.execute("INSERT INTO USUARIO SET nombre = ?, apellidos = ?, correo = ?, clave = ?, rol = ?,  fecha_nacimiento = ?",
        let result = connection.execute("INSERT INTO USUARIO SET nombre = ?, apellidos = ?, correo = ?, clave = ?, rol = ?, fecha_nacimiento = ?",
  [nombre, apellidos, correo, clave, rol, fechaNacimiento]);

        return result
    }

    async function verificarCredenciales(connection, correo, clave) {
        // Realizar la consulta para verificar las credenciales
        const [rows, fields] = await connection.execute("SELECT * FROM USUARIO WHERE correo = ? AND clave = ?", [correo, clave]);
    
        // Verificar si se encontró un usuario con las credenciales proporcionadas
        if (rows.length > 0) {
            // Se encontró un usuario, devolver sus datos
            return rows[0];
        } else {
            // No se encontró ningún usuario con las credenciales proporcionadas
            return null;
        }
    }

    async function obtenerUsuario(connection, id) {
        return await connection.execute("SELECT * FROM USUARIO WHERE ID = ?", [id])
    }

    async function obtenerUsuarioPorCorreoClave(connection, correo, clave) {
        let result = await connection.execute("SELECT * FROM USUARIO WHERE CORREO = ? AND CLAVE = ?", [correo, clave]);
        return result[0]
    }

exports.getConnection = getConnection
exports.registrarUsuario = registrarUsuario
exports.verificarCredenciales = verificarCredenciales
exports.obtenerUsuario = obtenerUsuario
exports.obtenerUsuarioPorCorreoClave = obtenerUsuarioPorCorreoClave
