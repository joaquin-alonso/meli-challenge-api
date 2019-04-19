module.exports = (req, res, next) => {
  const msg = res.locals.message || 'Resource not found.';

  req.log.info(msg);

  res.status(404).send({
    status: 404,
    error: 'not_found',
    message: res.locals.message || 'Resource not found.',
    stack: res.locals.stack || ''
  });
};
