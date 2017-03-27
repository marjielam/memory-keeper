/*jshint esversion: 6 */

import React from 'react';

const MemoryTile = props => {
  if (props.editing == "true") {
    return (
      <div className="memory-tile">
        <input type="textarea" id="memory-edit" defaultValue={props.body}/>
        <button className="update-memory" onClick={() => props.updateMemory(props.id, props.dayId)}>Save</button>
      </div>
    );
  } else {
    return (
      <div className="memory-tile">
        <span>{props.body}</span>
        <button className="edit-memory" onClick={() => props.openMemoryEditForm(props.id)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button className="delete-memory" onClick={() => props.deleteMemory(props.id)}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

export default MemoryTile;
