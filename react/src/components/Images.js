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
      cloudinaryUploadUrl: "",
      cloudinaryUploadPreset: ""
    };
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleLargeImageClick = this.handleLargeImageClick.bind(this);
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
        'day_id': this.props.dayId,
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
        url={this.state.largeImageUrl}
        handleLargeImageClick={this.handleLargeImageClick}
      />;
    }

    let dropzone;
    if (this.state.editing) {
      dropzone =
      <div>
        <h2 onClick={() => this.toggleEditing()}><i className="fa fa-minus" aria-hidden="true"></i>Hide photo uploader</h2>
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
        <h2 onClick={() => this.toggleEditing()}>
          <i className="fa fa-plus" aria-hidden="true"></i>Add a photo
        </h2>
      </div>;
    }

    return (
      <div className="image-list">
        {dropzone}
        {largeImage}
        {images}
      </div>
    );
  }
}

export default Images;
