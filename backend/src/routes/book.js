// backend/src/routes/books.js
const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET /api/books
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const title = req.query.title || "";
    const rating = parseInt(req.query.rating) || 0;
    const inStock = req.query.inStock;
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    const filter = {
      title: { $regex: title, $options: "i" },
      rating: { $gte: rating },
      price: { $gte: minPrice, $lte: maxPrice },
    };

    if (inStock === "true") filter.availability = /In stock/i;
    else if (inStock === "false") filter.availability = /Out of stock/i;

    const totalBooks = await Book.countDocuments(filter);
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json({ books, totalPages, currentPage: page });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
