/*jshint esversion: 6 */

import React from 'react';

const LinkForm = props => {
  return (
    <div className="link-form">
      <span>What link do you want to save?</span><br/>
      <span>Label </span><input type="textarea" name="label-input" id="label-input"/><br/>
      <span>URL (required) </span><input type="textarea" name="url-input" id="url-input"/><br/>
      <span>Comment </span><input type="textarea" name="comment-input" id="comment-input"/>
      <button className="save-link" onClick={() => props.createLink()}>Save</button>
    </div>
  );
}

export default LinkForm;
