/*jshint esversion: 6 */

import React from 'react';

const ImageLarge = props => {
  return (
    <div className="image-large">
      <img src={props.url} onClick={() => props.handleLargeImageClick()}/>
      <p className="delete-image" onClick={() => props.deleteImage(props.id)}>Delete selected photo</p>
    </div>
  );
}

export default ImageLarge;
