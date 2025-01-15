import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../services/bookService';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    publishedYear: ''
  });

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    try {
      const data = await getBookById(id);
      setBook(data);
      setFormData({
        title: data.title,
        author: data.author,
        price: data.price,
        publishedYear: data.publishedYear
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to load book details');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedBook = await updateBook(id, {
        ...formData,
        price: parseFloat(formData.price),
        publishedYear: parseInt(formData.publishedYear)
      });
      setBook(updatedBook);
      setIsEditing(false);
      setLoading(false);
    } catch (err) {
      setError('Failed to update book');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!book) return <div className="text-center p-4">Book not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        {!isEditing ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <div className="space-y-4">
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Price: ${book.price}</p>
              <p className="text-gray-600">Published: {book.publishedYear}</p>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate('/books')}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Back to List
                </button>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Published Year
              </label>
              <input
                type="number"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
                required
                min="1900"
                max="2024"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Book'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookDetails;