import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays an input for updating a Book's shelf
 */
function BookshelfChanger({
  currentShelf,
  shelves,
  updateShelf,
}) {
  const handleChange = event => updateShelf(event.target.value);

  return (
    <div className="book-shelf-changer">
      <select
        defaultValue={currentShelf}
        onChange={handleChange}
      >
        <option
          disabled
          key="move"
          value="move"
        >
          Move to...
        </option>
        { shelves.map(({ title, value }) => (
          <option
            key={value}
            value={value}
          >
            {title}
          </option>
        ))}
      </select>
    </div>
  );
}

BookshelfChanger.propTypes = {
  currentShelf: PropTypes.string.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default BookshelfChanger;
