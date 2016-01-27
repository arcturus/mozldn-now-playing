var sonos = require('sonos');

var SonosDiscoverer = {
  discover: function() {
    return new Promise((resolve, reject) => {
      sonos.search({timeout: 2000}, (sonos) => {
        // sonos.on('timeout', () => {
        //   reject({
        //     timeout: true
        //   });
        // });
        // sonos.on('error', (err) => {
        //   reject(err);
        // });
        sonos.currentTrack((err, track) => {
          if (err) {
            reject(err);
          } else {
            resolve(track);
          }
        });
      });
    });
  }
};

module.exports = SonosDiscoverer;