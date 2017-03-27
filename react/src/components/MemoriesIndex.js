/*jshint esversion: 6 */

import React, { Component } from 'react';
import MemoryTile from './MemoryTile';

class MemoriesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memoriesInfo: []
    };
  }

  componentDidMount() {
    this.getMemories();
  }

  getMemories() {
    fetch(`/api/v1/users/${this.props.currentUserId}/all_memories`)
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
      this.setState({ memoriesInfo: memories });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let memoriesInfo = this.state.memoriesInfo.map(day => {
      let memories = day[1].map(memory => {
        return (
          <MemoryTile
          key={memory.id}
          id={memory.id}
          body={memory.body}
          />
        );
      });
      return (
        <div>
          {day[0].date}
          {memories}
        </div>
      );
    });
    return (
      <div>
      <h2>All Memories</h2>
      {memoriesInfo}
      </div>
    );
  }
}

export default MemoriesIndex;
