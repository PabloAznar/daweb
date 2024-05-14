var express = require('express');
var router = express.Router();
var bbdd = require("../javascripts/repositorioBicicletas")
var bbddReservas = require("../javascripts/repositorioReservas")

var app = express()
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

  router.post('/', function(req, res, next) {
    let nombre = req.body.nombre
    let estacion = req.body.estacion
    let numeroBicicletas = req.body.numeroBicicletas

    bbdd.getConnection()
    .then(con => { 
        return bbdd.registrarBicicleta(con, nombre, estacion, numeroBicicletas)
    })
    .then(result => {
        res.send("Bicicleta dada de alta")
    })
    .catch(error => {console.log(error)});
  });

  router.get("/estacion/:idEstacion", function(req, res, next) {
    let idEstacion = req.params.idEstacion;
    bbdd.getConnection()
    .then(con => {
        return bbdd.obtenerBicicletasByEstacion(con, idEstacion)
    })
    .then(data => {
        res.render('bicicletas', {'tittle' : 'Bicicletas', 'bicicleta' : data} )
    })
    .catch(error => {console.log(error)})
  })

  router.get("/estacion/:idEstacion/info", function(req, res, next) {
    let idEstacion = req.params.idEstacion;
    bbdd.getConnection()
    .then(con => {
        return bbdd.obtenerBicicletasByEstacion(con, idEstacion)
    })
    .then(data => {
        res.send(data)
    })
    .catch(error => {console.log(error)})
  })

  router.delete("/:id", function(req, res, next) {
    let idBicicleta = req.params.id
    bbdd.getConnection()
    .then(con => {
        return bbdd.eliminarBicicletas(con, idBicicleta)
    })
    .then(result => {
        res.send("Bicicleta eliminada")
    })
    .catch(error => {console.log(error)})
  })

  router.put("/:id/reservar", function(req, res, next) {
    let idBicicleta = req.params.id
    bbdd.getConnection()
    .then(con => {
        bbddReservas.reservarBicicleta(con, 0, id)
        return bbdd.reservarBicicleta(con, idBicicleta)
    })
    .then(result => {
        res.send("Bicicleta reservada")
    })
    .catch(error => {console.log(error)})
  })

  router.get("/disponibles", function(req, res, next) {
    let idEstacion = req.params.idEstacion;
    bbdd.getConnection()
    .then(con => {
        return bbdd.obtenerBicicletasDisponibles(con)
    })
    .then(data => {
        res.render('reservaBicicletas', {'tittle' : 'Bicicletas', 'bicicleta' : data} )
    })
    .catch(error => {console.log(error)})
  })

  module.exports = router;