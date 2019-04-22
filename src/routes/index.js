const express = require('express');
const router = new express.Router();
const itemsService = require('../services/items');

router.get('/check', async (req, res) => {
  res.send('ok');
});

router.get('/api/items', async (req, res, next) => {
  const q = req.query ? req.query.q : false;
  const limit = 4;

  if (q) {
    itemsService
      .getItems(q, limit)
      .then(response => {
        res.send(response);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          res.locals.message = `No results found for query "${q}"`;
          res.locals.stack = error.stack;
          next();
        } else {
          next(error);
        }
      });
  } else {
    next();
  }
});

router.get('/api/items/:id', async (req, res, next) => {
  const id = req.params.id;

  if (id) {
    itemsService
      .getItem(id)
      .then(response => {
        res.send(response);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          res.locals.message = `Item with id ${id} not found.`;
          res.locals.stack = error.stack;
          next();
        } else {
          next(error);
        }
      });
  } else {
    next();
  }
});

module.exports = router;
