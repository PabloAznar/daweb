var express = require('express');
var router = express.Router();
var bbddReservas = require("../javascripts/repositorioReservas")
var bbddAlquileres = require("../javascripts/repositorioAlquileres")


var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', function (req, res, next) {
  let id = req.params.id
  bbddReservas.getConnection()
    .then(con => {
      let datos = []
      return bbddReservas.obtenerHistorial(con, id)
        .then((data) => {
            datos.push(data)
          return  bbddAlquileres.obtenerHistorial(con, id)
          .then((data) => {
            datos.push(data)
            return datos
          })
        })
    })
    .then((data) => {
      res.render('historial', { 'reserva': data[0], 'alquiler': data[1] })
    })
    .catch(error => { console.log(error) });
});

module.exports = router;