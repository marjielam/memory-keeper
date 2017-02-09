/*jshint esversion: 6 */

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import ImageTile from './ImageTile';
import ImageLarge from './ImageLarge';

class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: "",
      uploadedFile: null,
      images: [],
      editing: false,
      largeImageId: "",
      largeImageUrl: "",
      cloudinaryUploadUrl: "",
      cloudinaryUploadPreset: ""
    };
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleLargeImageClick = this.handleLargeImageClick.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentWillMount() {
    this.getEnvVariables();
    this.getImages();
  }

  getImages() {
    fetch(`/api/v1/days/${this.props.dayId}/images`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let images = body;
      this.setState({ images: images });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getEnvVariables() {
    fetch('/api/v1/env_variables')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let variables = body;
      this.setState({
        cloudinaryUploadUrl: variables["url"],
        cloudinaryUploadPreset: variables["preset"]
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  saveImageToDatabase(url) {
    let imageData = {
      'image': {
        'url': url
      }
    };
    let jsonStringData = JSON.stringify(imageData);
    fetch(`/api/v1/days/${this.props.dayId}/images`, {
      method: 'post',
      body: jsonStringData
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let images = body;
      this.setState({ images: images });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleImageUpload(file) {
    let upload = request.post(this.state.cloudinaryUploadUrl)
                        .field('upload_preset', this.state.cloudinaryUploadPreset)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        this.saveImageToDatabase(response.body.secure_url);
      }
    });
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  toggleEditing() {
    let newState = !this.state.editing;
    this.setState({ editing: newState });
  }

  handleImageClick(id, url) {
    this.setState({ largeImageId: id, largeImageUrl: url });
  }

  handleLargeImageClick() {
    this.setState({ largeImageId: "", largeImageUrl: "" });
  }

  deleteImage(id) {
    if (confirm("Are you sure?")) {
      fetch(`/api/v1/days/${this.props.dayId}/images/${id}`, {
        method: 'delete'
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}, (${response.statusText})`;
          let error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let images = body;
        this.setState({
          images: images,
          largeImageId: "",
          largeImageUrl: ""
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render() {
    let images = this.state.images.map(image => {
      return (
        <ImageTile
        key={image.id}
        id={image.id}
        url={image.image_url}
        handleImageClick={this.handleImageClick}
        />
      );
    });

    let largeImage;
    if (this.state.largeImageId != "" && this.state.largeImageUrl != "") {
      largeImage =
      <ImageLarge
        key={this.state.largeImageId}
        id={this.state.largeImageId}
        url={this.state.largeImageUrl}
        handleLargeImageClick={this.handleLargeImageClick}
        deleteImage={this.deleteImage}
      />;
    }

    let dropzone;
    if (this.state.editing) {
      dropzone =
      <div>
        <h3 onClick={() => this.toggleEditing()}><i className="fa fa-minus" aria-hidden="true"></i>HIDE PHOTO UPLOADER</h3>
        <Dropzone
        className="image-uploads"
        multiple={false}
        accept="image/*"
        onDrop={this.onImageDrop.bind(this)}>
        <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
      </div>;
    } else {
      dropzone =
      <div>
        <h3 onClick={() => this.toggleEditing()}>
          <i className="fa fa-plus" aria-hidden="true"></i>ADD A PHOTO
        </h3>
      </div>;
    }

    return (
      <div className="small-12 columns images">
        <h2>Photos</h2>
        {dropzone}
        <div className="image-list">{images}</div>
        <br/><br/><br/><br/><br/><br/>
        {largeImage}
      </div>
    );
  }
}

export default Images;
