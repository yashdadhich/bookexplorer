import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Book not found");
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-detail-page">
      {/* Back link */}
      <div className="detail-header">
        <Link to="/" className="back-link">
          ← Back to Books
        </Link>
      </div>

      {/* page layout */}
      <div className="detail-content">
        <div className="detail-img-wrapper">
          <img src={book.thumbnail} alt={book.title} className="detail-img" />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">
            by <strong>abyd.in</strong>
            {book.author}
          </p>

          <div className="detail-labels">
            <span className="book-card-price-label">Price: £{book.price}</span>
            <span className="book-card-rating-label">
              Rating: {book.rating}
            </span>
            <span
              className={`book-card-availability-label ${
                book.availability ? "in-stock" : "out-of-stock"
              }`}
            >
              {book.availability ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <a
            href={book.detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="view-details-btn btn-cyan"
          >
            View on Original Site
          </a>
        </div>
      </div>
    </div>
  );
}
