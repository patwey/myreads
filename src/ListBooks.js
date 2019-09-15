import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

function ListBooks({
  books,
  shelves,
  title,
  updateShelf,
}) {
  const visibleShelves = shelves.filter(({ value }) => value !== 'none')

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{title}</h1>
      </div>
      <div className="list-books-content">
        { visibleShelves.map(({ title, value }) => (
          <Bookshelf
            books={books.filter(book => book.shelf === value)}
            key={value}
            shelves={shelves}
            title={title}
            updateShelf={updateShelf}
          />
        ))}
      </div>
      <div className="open-search">
        <Link to="/search">
          Add a book
        </Link>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  shelves: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  title: PropTypes.string.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default ListBooks;
