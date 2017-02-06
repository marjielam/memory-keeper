/*jshint esversion: 6 */

import React from 'react';

const FitbitTile = props => {
  return (
    <div className="small-12 medium-4 columns fitbit-tile">
      <h3>{props.title}</h3>
      <p>{props.data}</p>
    </div>
  );
}

export default FitbitTile;
