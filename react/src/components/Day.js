/*jshint esversion: 6 */

import React, { Component } from 'react';
import Question from './Question';
import Fitbit from './Fitbit';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: ""
    };
    this.getDay = this.getDay.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
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
      let day = body;
      this.setState({ day: day });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return (
      <div>
        <Question
        dayId={this.props.dayId}
        dayDate={this.state.day.date}
        questionId={this.props.questionId}
        questionBody={this.props.questionBody}
        currentUserId={this.props.currentUserId}
        />
        <Fitbit />
      </div>
    );
  }
}

export default Day;
