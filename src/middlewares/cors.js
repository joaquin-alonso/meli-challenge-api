const cors = require('cors');
const config = require('../config/');

const whitelist = config.corsWhitelist.split(',');

module.exports = cors({
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
});
