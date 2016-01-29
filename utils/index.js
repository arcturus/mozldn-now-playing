module.exports = {
  getOrigin: function(req) {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
  }
};
