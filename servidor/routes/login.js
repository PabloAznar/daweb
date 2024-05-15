var express = require('express');
var router = express.Router();
var bbdd = require('../javascripts/respositorioUsuarios');

router.get('/', function(req, res, next) {
    let correo = req.query.correo;
    let clave = req.query.clave;

    // Verificar si se proporcionaron el correo y la clave
    if (!correo || !clave) {
        return res.status(400).send("Debe proporcionar correo y clave");
    }

    // Aquí realizas la consulta a la base de datos para verificar el correo y la clave
    bbdd.verificarCredenciales(correo, clave, function(err, usuario) {
        if (err) {
            // Manejo del error
            console.error("Error al verificar las credenciales:", err);
            return res.status(500).send("Error interno del servidor");
        }

        if (usuario) {
            // Credenciales correctas, iniciar sesión
            // Por ejemplo, podrías establecer una sesión o devolver un token de autenticación
            // En este ejemplo, simplemente respondemos con un mensaje de éxito
            res.status(200).send("Inicio de sesión exitoso");
        } else {
            // Credenciales incorrectas
            res.status(401).send("Credenciales incorrectas");
        }
    });
});

module.exports = router;
