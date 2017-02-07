/*jshint esversion: 6 */

import React from 'react';

const FitbitTile = props => {
  return (
    <div className="small-12 medium-4 columns fitbit-tile">
      <p>{props.icon}</p>
      <p>{props.data}</p>
      <p>{props.title}</p>
    </div>
  );
}

export default FitbitTile;
