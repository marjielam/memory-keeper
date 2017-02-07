/*jshint esversion: 6 */

import React from 'react';

const ImageLarge = props => {
  return (
    <div className="image-large" onClick={() => props.handleLargeImageClick()}>
      <img src={props.url} />
      <p>Delete selected photo</p>
    </div>
  );
}

export default ImageLarge;
