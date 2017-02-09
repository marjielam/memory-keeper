/*jshint esversion: 6 */

import React, { Component } from 'react';
import LinkForm from './LinkForm';
import LinkTile from './LinkTile';

class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      links: [],
      editingLinkId: ""
    };
    this.createLink = this.createLink.bind(this);
    this.openLinkEditForm = this.openLinkEditForm.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.deleteLink = this.deleteLink.bind(this);
  }

  componentWillMount() {
    this.getLinks();
  }

  getLinks() {
    fetch(`/api/v1/days/${this.props.dayId}/links`)
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
      let links = body;
      this.setState({ links: links });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  toggleEditing() {
    let newState = !this.state.editing;
    this.setState({ editing: newState });
  }

  createLink() {
    let label = document.getElementById('label-input').value;
    let url = document.getElementById('url-input').value;
    let comment = document.getElementById('comment-input').value;
    let linkData = {
      'link': {
        'label': label,
        'url': url,
        'comment': comment
      }
    };
    let jsonStringData = JSON.stringify(linkData);
    fetch(`/api/v1/days/${this.props.dayId}/links`, {
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
      let links = body;
      this.setState({
        links: links,
        editing: false
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  openLinkEditForm(id) {
    this.setState({ editingLinkId: id });
  }

  updateLink(id) {
    let label = document.getElementById('label-edit').value;
    let url = document.getElementById('url-edit').value;
    let comment = document.getElementById('comment-edit').value;
    let linkData = {
      'link': {
        'label': label,
        'url': url,
        'comment': comment
      }
    };
    let jsonStringData = JSON.stringify(linkData);
    fetch(`/api/v1/days/${this.props.dayId}/links/${id}`, {
      method: 'put',
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
      let links = body;
      this.setState({
        links: links,
        editingLinkId: ""
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteLink(id) {
    if (confirm("Are you sure?")) {
      fetch(`/api/v1/days/${this.props.dayId}/links/${id}`, {
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
        let links = body;
        this.setState({
          links: links,
          editingLinksId: ""
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render() {
    let form;
    if (this.state.editing) {
      form =
      <div>
        <h3 onClick={() => this.toggleEditing()}>
          <i className="fa fa-minus" aria-hidden="true"></i>HIDE NEW LINK FORM
        </h3>
        <LinkForm
        createLink={this.createLink}
        />
      </div>;
    } else {
      form =
      <h3 onClick={() => this.toggleEditing()}>
        <i className="fa fa-plus" aria-hidden="true"></i>ADD A LINK
      </h3>;
    }

    let links = this.state.links.map(link => {
      if (link.id == this.state.editingLinkId) {
        return (
          <LinkTile
          key={link.id}
          id={link.id}
          label={link.label}
          url={link.url}
          comment={link.comment}
          openLinkEditForm={this.openLinkEditForm}
          updateLink={this.updateLink}
          deleteLink={this.deleteLink}
          editing="true"
          />
        );
      } else {
        return (
          <LinkTile
          key={link.id}
          id={link.id}
          label={link.label}
          url={link.url}
          comment={link.comment}
          openLinkEditForm={this.openLinkEditForm}
          updateLink={this.updateLink}
          deleteLink={this.deleteLink}
          editing="false"
          />
        );

      }
    });

    return (
      <div className="small-12 medium-6 columns links">
        <h2>Links</h2>
        {form}
        {links}
      </div>
    );
  }
}

export default Links;
