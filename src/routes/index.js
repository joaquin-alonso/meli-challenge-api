const express = require('express');
const router = new express.Router();
const config = require('../config');

router.get('/check', async (req, res) => {
  res.send('ok');
});

router.get('/api/items', async (req, res) => {
  const q = req.query;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
