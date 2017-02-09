/*jshint esversion: 6 */

import React, { Component } from 'react';
import MemoryForm from './MemoryForm';
import MemoryTile from './MemoryTile';

class Memories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      memories: [],
      editingMemoryId: ""
    };

    this.createMemory = this.createMemory.bind(this);
    this.openMemoryEditForm = this.openMemoryEditForm.bind(this);
    this.updateMemory = this.updateMemory.bind(this);
    this.deleteMemory = this.deleteMemory.bind(this);
  }

  componentWillMount() {
    this.getMemories();
  }

  getMemories() {
    fetch(`/api/v1/days/${this.props.dayId}/memories`)
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
      let memories = body;
      this.setState({ memories: memories });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  toggleEditing() {
    let newState = !this.state.editing;
    this.setState({ editing: newState });
  }

  createMemory() {
    let body = document.getElementById('memory-input').value;
    let memoryData = {
      'memory': {
        'body': body
      }
    };
    let jsonStringData = JSON.stringify(memoryData);
    fetch(`/api/v1/days/${this.props.dayId}/memories`, {
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
      let memories = body;
      this.setState({
        memories: memories,
        editing: false
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  openMemoryEditForm(id) {
    this.setState({ editingMemoryId: id });
  }

  updateMemory(id) {
    let newBody = document.getElementById('memory-edit').value;
    let memoryData = {
      'memory': {
        'body': newBody
      }
    };
    let jsonStringData = JSON.stringify(memoryData);
    fetch(`/api/v1/days/${this.props.dayId}/memories/${id}`, {
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
      let memories = body;
      this.setState({
        memories: memories,
        editingMemoryId: ""
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteMemory(id) {
    if (confirm("Are you sure?")) {
      fetch(`/api/v1/days/${this.props.dayId}/memories/${id}`, {
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
        let memories = body;
        this.setState({
          memories: memories,
          editingMemoryId: ""
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
          <i className="fa fa-minus" aria-hidden="true"></i>HIDE NEW MEMORY FORM
        </h3>
        <MemoryForm
        createMemory={this.createMemory}
        />
      </div>;
    } else {
      form =
      <h3 onClick={() => this.toggleEditing()}>
        <i className="fa fa-plus" aria-hidden="true"></i>ADD A MEMORY
      </h3>;
    }

    let memories = this.state.memories.map(memory => {
      if (memory.id == this.state.editingMemoryId) {
        return (
          <MemoryTile
          key={memory.id}
          id={memory.id}
          body={memory.body}
          openMemoryEditForm={this.openMemoryEditForm}
          updateMemory={this.updateMemory}
          editing="true"
          />
        );
      } else {
        return (
          <MemoryTile
          key={memory.id}
          id={memory.id}
          body={memory.body}
          openMemoryEditForm={this.openMemoryEditForm}
          updateMemory={this.updateMemory}
          deleteMemory={this.deleteMemory}
          editing="false"
          />
        );
      }

    });
    return (
      <div className="small-12 medium-6 columns memories">
        <h2>Memories</h2>
        {form}
        {memories}
      </div>
    );
  }
}

export default Memories;
