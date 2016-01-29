var express = require('express');
var router = express.Router();
var sonos = require('../sonos');

function discover(req, res, view) {
  return sonos.discover().then((data) => {
    if (view === 'index') {
      data.oembed = getOrigin(req) + 'oembed.json';
    }
    res.render(view, data);
  }, (err) => {
    res.render('error', err);
  })
}

function getOrigin(req) {
  return req.protocol + '://' + req.get('host') + req.originalUrl;
}

router.get(/^\/(index\.html)?$/, function(req, res, next) {
  discover(req, res, 'index');
});

router.get(/^\/widget.html$/, function(req, res, next) {
  discover(req, res, 'widget');
});

router.get(/^\/oembed.json$/, function(req, res, next) {
  sonos.discover().then((track) => {
    var oembed = {
      version: '1.0',
      type: 'web',
      provider_name: 'MozLDN Now Playing',
      provider_url: getOrigin(req),
      title: track.title,
      author_name: track.artist,
      thumbnail_url: track.albumArtURL,
      height: 640,
      width: 640,
      html: '<iframe src="' + getOrigin(req) + '" width="640" height="640"></iframe>'
    }
    res.send(oembed);
  }).catch((err) => {
    next(err);
  });
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
