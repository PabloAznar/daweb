var express = require('express');
var router = express.Router();
var bbdd = require('../javascripts/repositorioReservas');

  var app = express()
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

  router.put('/:id', function(req, res, next) {
    let id = req.params.id

    bbdd.getConnection()
    .then(con => { 
        return bbdd.formalizarReserva(con, id)
    })
    .then(result => {
        res.send("Usuario registrado")
    })
    .catch(error => {console.log(error)});
  });

  module.exports = router;