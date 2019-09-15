import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object),
    shelves: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
    showSearchPage: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired,
  };

  visibleShelves = this.props.shelves.filter(({ value }) => value !== 'none')

  render() {
    const {
      books,
      shelves,
      showSearchPage,
      title,
      updateShelf,
    } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
        <div className="list-books-content">
          { this.visibleShelves.map(({ title, value }) => (
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
          {/* TODO: use React router */}
          <button onClick={showSearchPage}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default ListBooks;
