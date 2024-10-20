import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Please enter a search term.');
      return;
    }
    setError('');
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyCPhupsK6Q7r3I2KjsBVeZOsRAKYc3f13M`
      );
      console.log(response.data); // Check if the response data is correct
      setBooks(response.data.items || []);
    } catch (err) {
      console.error('Error:', err); // Log the exact error
      setError('Error fetching data from API.');
    }
  };
  
  return (
    <div className="app">
      <h1>Book Finder Application</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="book-results">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  'https://via.placeholder.com/150'
                }
                alt={book.volumeInfo.title}
              />
              <div>
                <h2>{book.volumeInfo.title}</h2>
                <h3>Author: {book.volumeInfo.authors?.join(', ')}</h3>
                <p>{book.volumeInfo.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No books found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}

export default App;
