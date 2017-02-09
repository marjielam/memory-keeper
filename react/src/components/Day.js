/*jshint esversion: 6 */

import React, { Component } from 'react';
import Question from './Question';
import Fitbit from './Fitbit';
import Images from './Images';
import Memories from './Memories';
import Bestsellers from './Bestsellers';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayInfo: "",
      dayId: this.props.dayId,
      userInfo: "",
      fitbitUser: false
    };
    this.getDay = this.getDay.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.getDisplayDate = this.getDisplayDate.bind(this);
  }

  componentWillMount() {
    this.getDay();
    this.getUserInfo();
  }

  getDay() {
    fetch(`/api/v1/days/${this.props.dayId}`)
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

  getUserInfo() {
    fetch(`/api/v1/users/${this.props.currentUserId}`)
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
      let userInfo = body;
      if (userInfo.provider == "fitbit") {
        this.setState({
          userInfo: userInfo,
          fitbitUser: true
        });
      } else {
        this.setState({ userInfo: userInfo });
      }
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
    let fitbit;
    if (this.state.dayInfo && this.state.fitbitUser) {
      fitbit =
      <Fitbit
      currentUserId={this.props.currentUserId}
      userInfo={this.state.userInfo}
      date={this.state.dayInfo.day.date}
      />;
    }

    if (this.state.dayInfo) {
      let displayDate =
        this.getDisplayDate(this.state.dayInfo.day.date, "full");

      return (
        <div>
          <h2 className="date">{displayDate}</h2>
          <Question
          dayId={this.state.dayInfo.day.id}
          dayDate={this.state.dayInfo.day.date}
          questionId={this.state.dayInfo.question.id}
          questionBody={this.state.dayInfo.question.body}
          currentUserId={this.props.currentUserId}
          getDisplayDate={this.getDisplayDate}
          />
          {fitbit}
          <Memories
          dayId={this.state.dayInfo.day.id}
          />
          <Bestsellers
          dayDate={this.state.dayInfo.day.date}
          />
          <Images
          dayId={this.state.dayInfo.day.id}
          />
        </div>
      );
    }
    else {
      return (
        <div />
      );
    }
  }
}

export default Day;
