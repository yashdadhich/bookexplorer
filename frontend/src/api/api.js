const API_BASE = "https://bookexplorer-3.onrender.com"; // backend server

// fetch all books (with optional query params)
export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/api/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

// fetch single book by id
export async function fetchBookById(id) {
  const res = await fetch(`${API_BASE}/api/books/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book details");
  return res.json();
}
  