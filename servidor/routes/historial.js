var express = require('express');
var router = express.Router();
var bbdd = require("../javascripts/repositorioReservas")


var app = express()
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

  router.get('/', function(req, res, next) {
    bbdd.getConnection()
    .then(con => {
        return bbdd.obtenerReservas(con, 0)
    })
    .then(data => {
        res.render('historial', {'reserva' : data, 'alquiler' : data} )
    })
    .catch(error => {console.log(error)});
  });

  module.exports = router;