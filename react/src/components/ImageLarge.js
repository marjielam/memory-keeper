/*jshint esversion: 6 */

import React, { Component } from 'react';

class ImageLarge extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    return (
      <div className="image-large">
        <img src={this.props.url} onClick={() => this.props.handleLargeImageClick()}/>
        <p className="delete-image" onClick={() => this.props.deleteImage(this.props.id)}>
          Delete selected photo
        </p>
      </div>
    );
  }
}

export default ImageLarge;
