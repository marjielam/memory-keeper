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
      let memoriesInfo = memories.sort((day1, day2) => {
        return day1[0].date < day2[0].date ? -1 : 1;
      });
      this.setState({ memoriesInfo: memoriesInfo });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getDisplayDate(dateString, method) {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let dateRaw = new Date(dateString);
    let dateCorrected = new Date(dateRaw.getTime() - dateRaw.getTimezoneOffset() * -60000);
    let displayDate;
    if (method == "full") {
      displayDate =
      `${monthNames[dateCorrected.getMonth()]} ${dateCorrected.getDate()}, ${dateCorrected.getFullYear()}`;
    } else if (method == "year") {
      displayDate = `${dateCorrected.getFullYear()}`;
    }
    return displayDate;
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
      let displayDate = this.getDisplayDate(day[0].date, 'full')
      return (
        <div>
          <h3>{displayDate}</h3>
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
