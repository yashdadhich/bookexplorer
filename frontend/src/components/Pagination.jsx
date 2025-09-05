// src/components/Pagination.jsx
import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="pagination-card" role="navigation" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`pagination-button${page === 1 ? " disabled" : ""}`}
        aria-disabled={page === 1}
      >
        ⬅ Prev
      </button>

      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`pagination-button${page === totalPages ? " disabled" : ""}`}
        aria-disabled={page === totalPages}
      >
        Next ➡
      </button>
    </div>
  );
};

export default Pagination;
