import React from "react";

const Filters = ({
  search,
  setSearch,
  ratingFilter,
  setRatingFilter,
  inStockFilter,
  setInStockFilter,
  priceRange,
  setPriceRange,
}) => {
  return (
    <div className="filters-container">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-input"
      />

      {/* Rating Filter */}
      <select
        value={ratingFilter}
        onChange={(e) => setRatingFilter(e.target.value)}
        className="filter-select"
      >
        <option value="">All Ratings</option>
        <option value="1">⭐ 1+</option>
        <option value="2">⭐ 2+</option>
        <option value="3">⭐ 3+</option>
        <option value="4">⭐ 4+</option>
        <option value="5">⭐ 5</option>
      </select>

      {/* Stock Filter */}
      <select
        value={inStockFilter}
        onChange={(e) => setInStockFilter(e.target.value)}
        className="filter-select"
      >
        <option value="">All Stock</option>
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>

      {/* Price Range */}
      <input
        type="number"
        name="min"
        placeholder="Min £"
        value={priceRange.min}
        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
        className="filter-input w-24"
      />
      <input
        type="number"
        name="max"
        placeholder="Max £"
        value={priceRange.max}
        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
        className="filter-input w-24"
      />
    </div>
  );
};

export default Filters;
