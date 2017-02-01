import React from 'react';

const PreviousAnswer = props => {
  return (
    <li>
      {props.displayDate}: {props.body}
    </li>
  );
}

export default PreviousAnswer;
