import React, { useState } from 'react';
import "./books.css"



function BookSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.items) {
          setResults(data.items);
        } else {
          setResults([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setResults([]);
      });
  };

  return (
    <div id='main-container'>
    <div id='title'> BOOK SEARCH</div>
      <form onSubmit={handleSubmit}>
        
          <input type="text" placeholder='Enter the Book here' value={query}  onChange={handleInputChange} id='search-box' />
      
        <button type="submit" id='search-btn'>Search</button>
      </form>
      <div id="container">
      {results.length > 0 && (
        <ul id='all-books' style={{listStyleType:'none'}}>
          {results.map((book) => (
            <li key={book.id} id='searched-book'>
              <a href={book.volumeInfo.infoLink} id="volume">
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} id="book"/>
                )}
            
              <div id='display-container'>
                <h5 id='new-title'>{book.volumeInfo.title}</h5>
                {book.volumeInfo.authors && (
                  <p id='author'>By: {book.volumeInfo.authors.join(', ')}</p>
                )}
                <p id='count'>Page Count: {book.volumeInfo.pageCount}</p>
                <p id='rating'>Rating: {book.volumeInfo.averageRating || 'N/A'}</p>
              </div>
              </a>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default BookSearch;
