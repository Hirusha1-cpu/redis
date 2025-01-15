import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks, deleteBook } from '../services/bookService';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load books');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter(book => book._id !== id));
      } catch (err) {
        setError('Failed to delete book');
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books Collection</h1>
        <Link 
          to="/books/new" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Book
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-2">By {book.author}</p>
            <p className="text-gray-800 mb-2">Published: {book.publishedYear}</p>
            <p className="text-green-600 font-bold mb-4">${book.price}</p>
            
            <div className="flex justify-end space-x-2">
              <Link 
                to={`/books/${book._id}`}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                View
              </Link>
              <Link 
                to={`/books/${book._id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No books available. Add some books to get started.
        </div>
      )}
    </div>
  );
};

export default BookList;