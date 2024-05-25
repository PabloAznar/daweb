var express = require('express');
var router = express.Router();
var bbdd = require('../javascripts/repositorioReservas');

  var app = express()
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

  router.post('/', function(req, res, next) {
    let idBicicleta = req.body.idBicicleta
    let idUsuario = req.body.idUsuario
    let idEstacion = req.body.idEstacion
    let usuario = req.body.usuario
    let bicicleta = req.body.bicicleta
    let estacion = req.body.estacion

    bbdd.getConnection()
    .then(con => {
      return bbdd.reservarBicicleta(con, idUsuario, idBicicleta, idEstacion, usuario, bicicleta, estacion)
    })
    .then((response) => {
      res.send("Reserva creada correctamente")
    })
    .catch((error) => console.log(error))
  })

  router.put('/:id', function(req, res, next) {
    let id = req.params.id
    
    bbdd.getConnection()
    .then(con => { 
        return bbdd.formalizarReserva(con, id)
    })
    .then(result => {
        res.send("Reserva formalizada")
    })
    .catch(error => {console.log(error)});
  });

  router.get('/usuario/:idUsuario/activa', function(req, res, next) {
    let idUsuario = req.params.idUsuario
    bbdd.getConnection()
    .then(con => {
      return bbdd.obtenerReservaActiva(con, idUsuario)
    })
    .then(result => {
      res.send(result)
    })
    .catch(error => {console.log(error)})
  })

  module.exports = router;