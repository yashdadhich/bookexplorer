// backend/src/controllers/bookController.js
const Book = require('../models/Book');
const path = require('path');
const { spawn } = require('child_process');

exports.getBooks = async (req, res) => {
  try {
    let { page = 1, limit = 20, q, minPrice, maxPrice, rating, inStock } = req.query;
    page = Math.max(1, parseInt(page));
    limit = Math.min(100, parseInt(limit) || 20);

    const filter = {};
    if (q) filter.$text = { $search: q };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (rating) filter.rating = parseInt(rating);
    if (inStock === 'true') filter.availability = { $regex: /in stock/i };
    if (inStock === 'false') filter.availability = { $not: /in stock/i };

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .sort({ title: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({ success: true, data: books, meta: { total, page, limit } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean();
    if (!book) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: book });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: 'Invalid id' });
  }
};

// Bonus: trigger scraper script (protected by REFRESH_TOKEN)
exports.refreshBooks = async (req, res) => {
  const token = req.header('x-refresh-token');
  if (!process.env.REFRESH_TOKEN || token !== process.env.REFRESH_TOKEN) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    // run the scraper script in ../scraper
    const scraperPath = path.resolve(__dirname, '../../scraper');
    const proc = spawn('node', ['scraper.js'], { cwd: scraperPath, shell: true });

    proc.stdout.on('data', data => console.log(`[scraper stdout] ${data}`));
    proc.stderr.on('data', data => console.error(`[scraper stderr] ${data}`));
    proc.on('close', code => console.log(`scraper exited with code ${code}`));

    res.json({ success: true, message: 'Scraper started' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to start scraper' });
  }
};
