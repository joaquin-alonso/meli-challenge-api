module.exports = {
  port: process.env.PORT || '80',
  logLevel: process.env.LOG_LEVEL || 'info',
  meliApi: process.env.MELI_API || 'https://api.mercadolibre.com/',
  corsWhitelist: process.env.CORS_WHITELIST || '*'
};
