var express = require('express');
var router = express.Router();
var bbdd = require('../javascripts/repositorioAlquileres');
var bbddBicicletas = require('../javascripts/repositorioBicicletas');

  var app = express()
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

  router.get('/usuario/:idUsuario/activo', function(req, res, next) {
    let idUsuario = req.params.idUsuario
    bbdd.getConnection()
    .then(con => {
      return bbdd.obtenerAlquilerActivo(con, idUsuario)
    })
    .then(result => {
      res.send(result)
    })
    .catch(error => {console.log(error)})
  })

  router.post('/', function(req, res, next) {
    let idUsuario = req.body.idUsuario
    let idBicicleta = req.body.idBicicleta
    let usuario = req.body.usuario
    let bicicleta = req.body.bicicleta
    let idEstacion = req.body.idEstacion
    let estacion = req.body.estacion
    bbdd.getConnection()
    .then((con) => {
      bbddBicicletas.alquilar(con, idBicicleta);
      return bbdd.alquilarBicicleta(con, idUsuario, usuario, idBicicleta, bicicleta, idEstacion, estacion)
      })
      .then((response) => {
        res.send("Bicicleta alquilada correctamente")
      })
    .catch((error) => console.log(error))
  })

  router.get('/usuario/:idUsuario', function(req, res, next) {
    let idUsuario = req.params.idUsuario

    bbdd.getConnection()
    .then(con => {
      return bbdd.obtenerAlquilerActivo(con, idUsuario)
    })
    .then((data) => {
      res.render('alquileres', { 'alquiler': data })

    })
  })

  router.put('/:id/finalizar', function(req, res, next) {
    let id = req.params.id
    let estacionDestino = req.body.estacionDestino
    bbdd.getConnection()
    .then(con => {
      return bbdd.finalizarAlquiler(con, id, estacionDestino)
    })
    .then((result) => {
      res.send("Alquiler finalizado")
    })
  })

  module.exports = router;