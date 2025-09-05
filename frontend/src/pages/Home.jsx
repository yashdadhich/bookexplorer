import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import BookGrid from "../components/BookGrid";
import Footer from "../components/Footer";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination & filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [inStockFilter, setInStockFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const loadBooks = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        title: search,
        rating: ratingFilter,
        inStock: inStockFilter,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      };
      const res = await axios.get("https://bookexplorer-3.onrender.com/api/books/", {
        params,
      });
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages || 1);
      setLoading(false);
    } catch (err) {
      console.error("Error loading books:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [page, search, ratingFilter, inStockFilter, priceRange]);

  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen font-inter">
        <Header />
        <div>
          <Hero />
          <div>
            {/* Search & Filters */}
            <div className="controls">
              <Filters
                search={search}
                setSearch={setSearch}
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                inStockFilter={inStockFilter}
                setInStockFilter={setInStockFilter}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>

            {/* Books Grid */}
            <BookGrid books={books} loading={loading} />

            {/* Pagination */}
            <div className="">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
