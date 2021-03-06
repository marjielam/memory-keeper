/*jshint esversion: 6 */

import React, { Component } from 'react';
import Moment from 'moment';
import DayTile from './DayTile';

class DayIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayInfo: []
    };
  }

  componentDidMount() {
    this.getDays();
  }

  getDays() {
    fetch(`/api/v1/users/${this.props.currentUserId}/days`)
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
      let dayInfo = body;
      this.setState({ dayInfo: dayInfo });
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
    let numTiles = this.state.dayInfo.length;
    let dayTiles = this.state.dayInfo.map((day, i) => {
      let displayDate = this.getDisplayDate(day.day.date, "full");
      if (numTiles == i + 1) {
        return (
          <DayTile
          key={day.day.id}
          dayId={day.day.id}
          questionBody={day.question.body}
          displayDate={displayDate}
          end='true'
          />
        );
      } else {
        return (
          <DayTile
          key={day.day.id}
          dayId={day.day.id}
          questionBody={day.question.body}
          displayDate={displayDate}
          end='false'
          />
        );
      }
    });
    return (
      <div className="day-index">
        <h2>Days you have viewed</h2>
        {dayTiles}
      </div>
    );
  }
}

export default DayIndex;
