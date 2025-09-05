// scraper/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String },
  rating: { type: Number },
  detailUrl: { type: String, unique: true, required: true },
  thumbnail: { type: String },
}, { timestamps: true });

bookSchema.index({ title: 'text' });

module.exports = mongoose.model('Book', bookSchema);
