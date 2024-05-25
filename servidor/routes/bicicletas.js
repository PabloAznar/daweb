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
    let nombreEstacion = req.body.nombreEstacion
    bbdd.getConnection()
    .then(con => { 
        return bbdd.registrarBicicleta(con, nombre, estacion, nombreEstacion, numeroBicicletas)
    })
    .then(result => {
        res.send("Bicicleta dada de alta")
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error.message)
    });
  });

  router.get("/estacion/:idEstacion", function(req, res, next) {
    let idEstacion = req.params.idEstacion;
    bbdd.getConnection()
    .then(con => {
      return obtenerDisponiblesByEstacion(con, idEstacion)
    })
    .then(data => {
        res.send(data)
    })
    .catch(error => {console.log(error)})
  })

  router.get("/estacion/:idEstacion/info", function(req, res, next) {
    let idEstacion = req.params.idEstacion;
    bbdd.getConnection()
    .then(con => {
      return obtenerDisponiblesByEstacion(con, idEstacion)
    })
    .then(data => {
        res.send(data)
    })
    .catch(error => {console.log(error)})
  })

  router.delete("/estacion/:id", function(req, res, next) {
    let idEstacion = req.params.id
    bbdd.getConnection()
    .then(con => {
        return bbdd.eliminarBicicletasEnEstacion(con, idEstacion)
    })
    .then(result => {
        res.send("Bicicleta eliminada")
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

  router.put("/:idBicicleta/reservar", function(req, res, next) {
    let idBicicleta =  req.params.idBicicleta
    bbdd.getConnection()
    .then(con => {
        return bbdd.reservarBicicleta(con, idBicicleta)
    })
    .then(result => {
        res.send("Bicicleta reservada")
    })
    .catch(error => {console.log(error)})
  })

  router.get("/disponibles", function(req, res, next) {
    bbdd.getConnection()
    .then(con => {
        return obtenerDisponibles(con)
    })
    .then(data => {
        res.render('reservaBicicletas', {'tittle' : 'Bicicletas', 'bicicleta' : data} )
    })
    .catch(error => {console.log(error)})
  })

  async function obtenerDisponibles(con) {
    let ids = await bbdd.obtenerBicicletasConReservaCaducada(con)
      for(const id of ids) {
        await bbdd.establecerDisponible(con, id.idBicicleta)
        await bbddReservas.establecerNoValida(con, id.idReserva)
      }
        return await bbdd.obtenerBicicletasDisponibles(con)
  }

  async function obtenerDisponiblesByEstacion(con, idEstacion) {
    let ids = await bbdd.obtenerBicicletasConReservaCaducada(con)
      for(const id of ids) {
        await bbdd.establecerDisponible(con, id.idBicicleta)
        await bbddReservas.establecerNoValida(con, id.idReserva)
      }
        return await bbdd.obtenerBicicletasByEstacion(con, idEstacion)
  }

  router.put("/:idBicicleta/estacion/:idEstacion/aparcar", function (req, res, next) {
    let idEstacion = req.params.idEstacion
    let idBicicleta = req.params.idBicicleta
    let nombreEstacion = req.body.estacion
  
    bbdd.getConnection()
      .then(con => {
        return bbdd.aparcarBicicleta(con, idEstacion, idBicicleta, nombreEstacion)
      })
      .then(data => {
        res.send(data)
      })
      .catch(error => { console.log(error) })
  })

  router.delete("estacion/:id", function(req, res, next) {
    let idEstacion = req.params.id

    bbdd.getConnection()
    .then(con => {
      return bbdd.eliminarBicicletasPorEstacion(con, idEstacion)
    })
    .then(result => {
      return res.send(result)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error.message)
    })
  })

  module.exports = router;