import React from 'react';
import update from 'immutability-helper';
import * as BooksAPI from './BooksAPI'
import './App.css';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  shelves = [
    { title: 'Currently Reading', value: 'currentlyReading' },
    { title: 'Want To Read', value: 'wantToRead' },
    { title: 'Read', value: 'read' },
    { title: 'None', value: 'none' },
  ];

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    });
  }

  updateShelf(book, shelf) {
    BooksAPI
      .update(book, shelf)
      .then((shelves) => {
        const newShelf = Object.entries(shelves).find(([_, ids]) => ids.includes(book.id))
        const newShelfValue = newShelf ? newShelf[0] : 'none'

        this.setState((prevState) => {
          const { books } = prevState;
          const bookIndex = books.findIndex(b => b.id === book.id);

          return {
            books: update(
              books,
              { [bookIndex]: { shelf: { $set: newShelfValue } } }
            ),
          };
        })
      })
  }

  render() {
    const {
      books,
      showSearchPage
    } = this.state;

    return (
      <div className="app">
        {showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <ListBooks
            books={books}
            shelves={this.shelves}
            showSearchPage={() => this.setState({ showSearchPage: true })}
            title="MyReads"
            updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
