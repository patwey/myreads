import React from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger';

function Book({
  book,
  shelves,
  updateShelf,
}) {
  const {
    authors,
    imageLinks,
    shelf,
    title,
  } = book;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageLinks.smallThumbnail}")`,
          }}
        >
        </div>
        <BookshelfChanger
          currentShelf={shelf}
          shelves={shelves}
          updateShelf={updateShelf}
        />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string,
    }).isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,  
  }).isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default Book;
