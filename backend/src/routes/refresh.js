// routes/refresh.js
const express = require('express');
const router = express.Router();
const { run } = require('../../../scraper/scraper');

router.post('/', async (req, res) => {
  try {
    await run(); // runs the scraper
    res.json({ success: true, message: 'Scraper run successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
