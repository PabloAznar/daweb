var express = require('express');
var router = express.Router();
var bbdd = require('../javascripts/respositorioUsuarios');

  var app = express()
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

  router.post('/', function(req, res, next) {
    let nombre = req.body.nombre
    let apellidos = req.body.apellidos
    let correo = req.body.correo
    let clave = req.body.clave
    let fechaNacimiento = req.body.fechaNacimiento

    bbdd.getConnection()
    .then(con => { 
        return bbdd.registrarUsuario(con, nombre, apellidos, correo, clave, fechaNacimiento)
    })
    .then(result => {
        res.send(result)
    })
    .catch(error => {console.log(error)});
  });

  module.exports = router;