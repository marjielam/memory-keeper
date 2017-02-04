/*jshint esversion: 6 */

import React, { Component } from 'react';
import Question from './Question';
import Fitbit from './Fitbit';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayInfo: ""
    };
    this.getDay = this.getDay.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    this.getDay();
  }

  componentWillUpdate() {
    this.getDay();
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

  render() {
    if (this.state.dayInfo) {
      return (
        <div>
          <Question
          dayId={this.state.dayInfo.day.id}
          dayDate={this.state.dayInfo.day.date}
          questionId={this.state.dayInfo.question.id}
          questionBody={this.state.dayInfo.question.body}
          currentUserId={this.props.currentUserId}
          />
          <Fitbit />
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
