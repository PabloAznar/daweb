var express = require('express');
var router = express.Router();

var bbdd = require('../javascripts/respositorioUsuarios');

  var app = express()
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
  let id = req.params.id

    bbdd.getConnection()
    .then(con => { 
        return bbdd.obtenerUsuario(con, id)
    })
    .then(result => {
        res.send(result)
    })
    .catch(error => {console.log(error)});
  });

router.post('/', function(req, res, next) {
  let correo = req.body.correo
  let clave = req.body.clave
 
  bbdd.getConnection()
  .then(con => {
    return bbdd.obtenerUsuarioPorCorreoClave(con, correo, clave)
  })
  .then(result => {
    if (result.length === 0) {
      res.status(404).send("User not found")
    } else {
      res.send(result)
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  });
  })


  router.get('/:id/obtener-reserva-alquiler', function(req, res, next) {
    let idUsuario = req.params.id

    bbdd.getConnection()
    .then(async (con) => {
      let result = []
      let reserva = await bbdd.obtenerReservaActiva(con, idUsuario)
      let alquiler = await bbdd.obtenerAlquilerActivo(con, idUsuario)
      if(reserva.length === 0) {
        reserva = [{'id_reserva': null}]
      }
      result = result.concat(reserva)
      if(alquiler.length === 0) {
        alquiler = [{'id_alquiler': null}]
      }
      result = result.concat(alquiler)
      return result
    })
    .then(result => {
      res.send(result)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error.message)
    })
  })

module.exports = router;
