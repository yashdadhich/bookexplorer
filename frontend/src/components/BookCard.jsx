import { Link } from "react-router-dom";

const BookCard = ({ book, onClick }) => {
  return (
    <div className="book-card">
      {/* Thumbnail */}
      <Link to={`/book/${book._id}`}>
        <img
          src={book.thumbnail}
          alt={book.title}
          className="book-card-img"
        />
      </Link>

      {/* Body */}
      <div className="book-card-body no-underline">
        {/* Title */}
        <h3 className="book-card-title">
          <Link to={`/book/${book._id}`}>{book.title}</Link>
        </h3>

        {/* Author */}
        <p className="book-card-author">by <strong>abyd.in</strong> {book.author}</p>

        {/* Labels section */}
        <div className="book-card-labels">
          <span className="book-card-price-label">
            Price: ${book.price}
          </span>
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

        {/* Button */}
         <Link
          to={`/book/${book._id}`}
          className="view-details-btn btn-blue"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
