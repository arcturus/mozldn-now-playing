var express = require('express');
var router = express.Router();
var sonos = require('../sonos');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('----> about to discover');
  sonos.discover().then((track) => {
    console.log('----> rendering index');
    res.render('index', track);
  }, (err) => {
    res.render('error', error);
  });
});

module.exports = router;
