import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

class SearchBooks extends Component {
  static propTypes = {
    searchBooks: PropTypes.func.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
    showMainPage: PropTypes.func.isRequired,
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
      showMainPage,
      updateShelf,
    } = this.props;
    const { query } = this.state;
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={showMainPage}>Close</button>
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
