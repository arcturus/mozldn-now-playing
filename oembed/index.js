var sonos = require('../sonos');
var utils = require('../utils');

var Oembed = function(req, res, next) {
  sonos.discover().then((track) => {
    var oembed = {
      version: '1.0',
      type: 'rich',
      provider_name: 'MozLDN Now Playing',
      provider_url: utils.getOrigin(req),
      title: track.title,
      author_name: track.artist,
      thumbnail_url: track.albumArtURL,
      height: 640,
      width: 640,
      html: '<iframe src="' + utils.getOrigin(req) + '" width="640" height="640"></iframe>'
    }
    res.send(oembed);
  }).catch((err) => {
    next(err);
  });
};

module.exports = Oembed;

