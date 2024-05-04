var express = require('express');
var router = express.Router();
var bbdd = require("../javascripts/repositorioBicicletas")

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

  module.exports = router;