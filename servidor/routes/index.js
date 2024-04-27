var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('./public/index.html')
  fetch('public/index.html',{method:'GET'}).then(data => {res.send(data)})
});

module.exports = router;
