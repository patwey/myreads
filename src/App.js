import React from 'react';
import update from 'immutability-helper';
import * as BooksAPI from './BooksAPI'
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
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

  defaultShelfValue = 'none';

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  updateShelf(book, shelf) {
    BooksAPI
      .update(book, shelf)
      .then((shelves) => {
        const newShelf = Object.entries(shelves).find(([_, ids]) => ids.includes(book.id));
        const newShelfValue = newShelf ? newShelf[0] : this.defaultShelfValue;

        this.setState((prevState) => {
          const { books: prevBooks } = prevState;
          const prevBookIndex = prevBooks.findIndex(b => b.id === book.id);
          const books = prevBookIndex !== -1
            ? update(prevBooks, { [prevBookIndex]: { shelf: { $set: newShelfValue } } })
            : [...prevBooks, { ...book, shelf: newShelfValue }];
          
          return { books };
        });
      });
  }

  searchBooks(query) {
    BooksAPI.search(query).then((results) => {
      const { error } = results;

      if (error) {
        return this.setState({ searchedBooks: [] });
      }

      this.setState((prevState) => {
        const { books } = prevState;
        const searchedBooks = results.map((bookResult) => {
          const book = books.find(b => b.id === bookResult.id) || bookResult;

          return { shelf: this.defaultShelfValue, ...book };
        });

        return { searchedBooks };
      });
    });
  }

  render() {
    const {
      books,
      searchedBooks,
      showSearchPage
    } = this.state;

    return (
      <div className="app">
        {showSearchPage ? (
          <SearchBooks
            books={searchedBooks}
            searchBooks={(query) => this.searchBooks(query)}
            shelves={this.shelves}
            showMainPage={() => this.setState({showSearchPage: false })}
            updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
          />
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
