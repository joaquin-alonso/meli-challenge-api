var bunyan = require('bunyan');
const config = require('../config');

const loggerInstance = bunyan.createLogger({
  name: 'meli-challenge-api-notifier',
  serializers: {
    req: require('bunyan-express-serializer'),
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  },
  level: config.logLevel
});

module.exports = (req, res, next) => {
  req.log = loggerInstance.child({
    req: req
  });
  next();
};
