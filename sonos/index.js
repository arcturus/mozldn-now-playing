var sonos = require('sonos');

function getSonos() {
  return new Promise((resolve) => {
    sonos.search({timeout: 2000}, (sonos) => {
      resolve(sonos);
    });
  });
}

var SonosDiscoverer = {
  discover: function() {
    var promises = [];
    promises.push(new Promise((resolve, reject) => {
      getSonos().then((sonos) => {
        sonos.currentTrack((err, track) => {
          if (err) {
            reject(err);
          } else {
            resolve(track);
          }
        });
      });
    }));
    promises.push(new Promise((resolve, reject) => {
      getSonos().then((sonos) => {
        sonos.getCurrentState((err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }));

    return Promise.all(promises).then((results) => {
      var track = results[0];
      track.status = results[1];

      return track;
    });
  },
  next: function() {
    return getSonos().then((sonos) => {
      return new Promise((resolve, reject) => {
        sonos.next((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  },
  prev: function() {
    return getSonos().then((sonos) => {
      return new Promise((resolve, reject) => {
        sonos.previous((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  },
  play: function() {
    return getSonos().then((sonos) => {
      return new Promise((resolve, reject) => {
        sonos.play((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  },
  pause: function() {
    return getSonos().then((sonos) => {
      return new Promise((resolve, reject) => {
        sonos.pause((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }
};

module.exports = SonosDiscoverer;