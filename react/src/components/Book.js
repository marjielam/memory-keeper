/*jshint esversion: 6 */

import React from 'react';

const Book = props => {
  return (
    <li>
      <span className="counter">{props.rank}</span>
      <a href={props.url} className="book-info">
        <span className="book-title">{props.title}</span> by {props.author}
      </a>
    </li>
  );
}

export default Book;
