/*jshint esversion: 6 */

import React from 'react';

const LinkTile = props => {
  if (props.editing == "true") {
    return (
      <div className="link-tile">
        <span>Label: </span><input type="textarea" name="label-edit" id="label-edit" defaultValue={props.label}/><br/>
        <span>URL (required): </span><input type="textarea" name="url-edit" id="url-edit" defaultValue={props.url}/><br/>
        <span>Comment: </span><input type="textarea" name="comment-edit" id="comment-edit" defaultValue={props.comment}/>
        <button className="update-link" onClick={() => props.updateLink(props.id)}>Save</button>
      </div>
    );
  } else {
    return (
      <div className="link-tile">
        <a href={props.url}>{props.label}</a>
        <p>{props.comment}</p>
        <button className="edit-link" onClick={() => props.openLinkEditForm(props.id)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="delete-link" onClick={() => props.deleteLink(props.id)}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

export default LinkTile;
