var sonos = require('sonos');

var SonosDiscoverer = {
  discover: function() {
    return new Promise((resolve, reject) => {
      sonos.search({timeout: 2000}, (sonos) => {
        sonos.currentTrack((err, track) => {
          if (err) {
            reject(err);
          } else {
            resolve(track);
          }
        });
      });
    });
  },
  next: function() {
    return new Promise((resolve, reject) => {
      sonos.search({timeout: 2000}, (sonos) => {
        sonos.next((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      });
    });
  },
  prev: function() {
    return new Promise((resolve, reject) => {
      sonos.search({timeout: 2000}, (sonos) => {
        sonos.previous((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      });
    });
  }
};

module.exports = SonosDiscoverer;