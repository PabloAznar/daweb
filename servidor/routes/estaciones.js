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

  router.put('/', function(req, res, next) {
    let id = req.body.id
    let nombre = req.body.nombre
    let capacidad = req.body.capacidad
    let numeroBicicletas = req.body.numeroBicicletas
    let codigoPostal = req.body.codigoPostal
    let fechaAlta = req.body.fechaAlta

    bbdd.getConnection()
    .then(con => {
        return bbdd.modificarEstacion(con, id, nombre, capacidad, numeroBicicletas, codigoPostal, fechaAlta)
    })
    .then(result => {
        res.send("Estacion modificada")
    })
    .catch(error => {console.log(error)})
  });

  router.delete("/:id", function(req, res, next) {
    let id = req.params.id;

    bbdd.getConnection()
    .then(con => {
        return bbdd.eliminarEstacion(con, id)
    })
    .then(result => {
        res.send("Estacion eliminada")
    })
    .catch(error => {console.log(error)})

  })

  router.get("/", function(req, res, next) {
    bbdd.getConnection()
    .then(con => {
        return bbdd.obtenerEstaciones(con)
    })
    .then(data => {
        res.render('estaciones', {'tittle' : 'estaciones', 'estacion' : data} )
    })
    .catch(error => {console.log(error)})
  })

  module.exports = router;