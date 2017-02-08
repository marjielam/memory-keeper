import React from 'react';

const MemoryForm = props => {
  return (
    <div className="memory-form">
      <span>What do you want to remember about today?</span><br/>
      <input type="textarea" name="memory-input" id="memory-input"/>
      <button className="save-memory" onClick={() => props.createMemory()}>Save</button>
    </div>
  );
}

export default MemoryForm;
