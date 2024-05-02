var express = require('express');
var router = express.Router();
var bbdd = require('../javascripts/repositorioEstaciones');

var app = express()
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

  router.post('/', function(req, res, next) {
    let nombre = req.body.nombre
    let capacidad = req.body.capacidad
    let codigoPostal = req.body.codigoPostal
    let fechaAlta = req.body.fechaAlta

    bbdd.getConnection()
    .then(con => { 
        return bbdd.registrarEstacion(con, nombre, capacidad, codigoPostal, fechaAlta)
    })
    .then(result => {
        res.send("Estacion dada de alta")
    })
    .catch(error => {console.log(error)});
  });

  module.exports = router;