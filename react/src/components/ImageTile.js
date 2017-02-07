/*jshint esversion: 6 */

import React from 'react';

const ImageTile = props => {
  return (
    <div className="image-tile" onClick={() => props.handleImageClick(props.id, props.url)}>
      <img src={props.url} />
    </div>
  );
}

export default ImageTile;
