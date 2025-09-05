import React from "react";
import BookCard from "./BookCard";

const BookGrid = ({ books, loading }) => {
  if (loading) {
    return <p className="text-center text-slate-600">Loading books...</p>;
  }

  if (!loading && books.length === 0) {
    return <p className="text-center text-slate-600">No books found.</p>;
  }

  return (
    <div className="book-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;
