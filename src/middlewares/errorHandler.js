module.exports = (err, req, res, next) => {
  req.log.error(err);

  res.status(500).send({
    status: 500,
    error: 'internal_server_error',
    message: 'Internal Server Error',
    stack: err.stack
  });
};
