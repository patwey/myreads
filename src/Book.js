import React from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger';

/**
 * Displays book data and a BookshelfChanger
 */
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

  let coverStyles = {
    width: 128,
    height: 193,
  };

  if (imageLinks) {
    coverStyles.backgroundImage = `url("${imageLinks.smallThumbnail}")`;
  }

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={coverStyles}
        >
        </div>
        <BookshelfChanger
          currentShelf={shelf}
          shelves={shelves}
          updateShelf={updateShelf}
        />
      </div>
      <div className="book-title">{title}</div>
      { authors && (
        <div className="book-authors">{authors.join(', ')}</div>
      )}
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string,
    }),
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,  
  }).isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default Book;
