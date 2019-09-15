import React from 'react';
import update from 'immutability-helper';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
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
        const newShelf = Object.entries(shelves).find(([, ids]) => ids.includes(book.id));
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
    } = this.state;

    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={searchedBooks}
              searchBooks={(query) => this.searchBooks(query)}
              shelves={this.shelves}
              showMainPage={() => this.setState({ showSearchPage: false })}
              updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={books}
              shelves={this.shelves}
              title="MyReads"
              updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
