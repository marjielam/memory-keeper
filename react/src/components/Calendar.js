/*jshint esversion: 6 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import Moment from 'moment';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: null
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
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
      let selectedDate = date._d;
      let matchingDate = this.compareDates(dayInfo, selectedDate);
      if (matchingDate) {
        browserHistory.push(`/days/${matchingDate.day.id}`);
        this.setState({ selectedDate: date });
      }
      else {
        this.createDay(selectedDate);
        this.setState({ selectedDate: date });
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  compareDates(dateArray, selectedDate) {
    let matchingDate;
    dateArray.forEach((date) => {
      let loopSelectedDate = selectedDate;
      let currentDate = new Date(date.day.date);
      if (currentDate.getDate() == loopSelectedDate.getDate() &&
        currentDate.getMonth() == loopSelectedDate.getMonth() &&
        currentDate.getYear() == loopSelectedDate.getYear()) {
        matchingDate = date;
      }
    });
    return matchingDate;
  }

  createDay(date) {
    let dayData = {
      'day': {
        'date': date,
        'userId': this.props.currentUserId
      }
    };
    let jsonStringData = JSON.stringify(dayData);
    fetch(`/api/v1/days`, {
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
      let day = body;
      browserHistory.push(`/days/${day.id}`);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return (
        <DatePicker
        selected={this.state.selectedDate}
        onChange={this.handleDateChange}
        placeholderText="Select a day to view"
        />
    );
  }
}

export default Calendar;
