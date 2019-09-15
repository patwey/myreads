import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function Bookshelf({
  books,
  shelves,
  title,
  updateShelf,
}) {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                shelves={shelves}
                updateShelf={(newShelf) => updateShelf(book, newShelf)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default Bookshelf;
