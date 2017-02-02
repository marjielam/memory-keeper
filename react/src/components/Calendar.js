import React, { Component } from 'react';
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
    this.setState({ selectedDate: date });
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
