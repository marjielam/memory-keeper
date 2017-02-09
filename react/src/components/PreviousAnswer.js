/*jshint esversion: 6 */

import React from 'react';

const PreviousAnswer = props => {
  return (
    <li onClick={() => props.handlePreviousAnswerClick(props.dayId)}>
      {props.body} ({props.displayDate})
    </li>
  );
}

export default PreviousAnswer;
