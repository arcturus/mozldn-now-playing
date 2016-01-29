var express = require('express');
var router = express.Router();
var sonos = require('../sonos');
var oembed = require('../oembed');
var utils = require('../utils');

function discover(req, res, view) {
  return sonos.discover().then((data) => {
    if (view === 'index') {
      data.oembed = utils.getOrigin(req) + 'oembed.json';
    }
    res.render(view, data);
  }, (err) => {
    res.render('error', err);
  })
}

router.get(/^\/(index\.html)?$/, function(req, res, next) {
  discover(req, res, 'index');
});

router.get(/^\/widget.html$/, function(req, res, next) {
  discover(req, res, 'widget');
});

router.get(/^\/oembed.json$/, function(req, res, next) {
  oembed(req, res, next);
});

router.get('/controls/next', function(req, res, next) {
  sonos.next().then(() => {
    res.send({});
  })
});

router.get('/controls/prev', function(req, res, next) {
  sonos.next().then(() => {
    res.send({});
  })
});

module.exports = router;
