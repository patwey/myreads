import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

/**
 * Displays a search bar, a link to the homepage, and a Bookshelf of books
 * matching the search query
 */
class SearchBooks extends Component {
  static propTypes = {
    searchBooks: PropTypes.func.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateShelf: PropTypes.func.isRequired,
  };

  state = { query: '' };

  handleChange = (event) => {
    const query = event.target.value;
    
    this.setState({ query });
    
    if (query !== '') {
      this.props.searchBooks(query);
    }
  }

  render() {
    const { 
      books,
      shelves,
      updateShelf,
    } = this.props;
    const { query } = this.state;
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              onChange={this.handleChange}
              placeholder="Search by title or author"
              type="text"
              value={query}  
            />

          </div>
        </div>
        <div className="search-books-results">
          {query !== '' && books.length !== 0 && (
            <Bookshelf
              books={books}
              key='results'
              shelves={shelves}
              updateShelf={updateShelf}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
