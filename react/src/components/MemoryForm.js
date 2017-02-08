import React from 'react';

const MemoryForm = props => {
  return (
    <div>
      <label htmlFor="memory-input">What do you want to remember about today?</label>
      <input type="textarea" name="memory-input" id="memory-input"/>
      <button className="save-memory" onClick={() => props.createMemory()}>Save</button>
    </div>
  );
}

export default MemoryForm;
