/*jshint esversion: 6 */

import React, { Component } from 'react';
import FitbitTile from './FitbitTile';

class Fitbit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      currentUserId: this.props.currentUserId,
      userInfo: this.props.userInfo,
      stepsData: "",
      sleepData: "",
      caloriesData: ""
    };
  }

  componentWillMount() {
    this.getStepsData();
    this.getSleepData();
    this.getCaloriesData();
  }

  getStepsData() {
    fetch(`/fitbit/users/${this.props.currentUserId}/steps/${this.props.date}.json`)
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
      let stepsData = body;
      this.setState({ stepsData: stepsData });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getSleepData() {
    fetch(`/fitbit/users/${this.props.currentUserId}/sleep/${this.props.date}.json`)
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
      let sleepData = body;
      this.setState({ sleepData: sleepData });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getCaloriesData() {
    fetch(`/fitbit/users/${this.props.currentUserId}/calories/${this.props.date}.json`)
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
      let caloriesData = body;
      this.setState({ caloriesData: caloriesData });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let stepsTile;
    let sleepTile;
    let caloriesTile;
    if (this.state.stepsData) {
      stepsTile =
      <FitbitTile
      title="Steps"
      data={this.state.stepsData["activities-steps"][0]["value"]}
      />;
    }

    if (this.state.sleepData) {
      let totalMinutes = this.state.sleepData["summary"]["totalMinutesAsleep"];
      let sleepHours = Math.floor(totalMinutes / 60);
      let sleepMinutes = totalMinutes % 60;
      let sleepData = `${sleepHours} hr ${sleepMinutes} min`
      sleepTile =
      <FitbitTile
      title="Sleep"
      data={sleepData}
      />;
    }

    if (this.state.caloriesData) {
      caloriesTile =
      <FitbitTile
      title="Calories"
      data={this.state.caloriesData["activities-calories"][0]["value"]}
      />;
    }
    return (
      <div className="fitbit">
        {stepsTile}
        {sleepTile}
        {caloriesTile}
      </div>
    );
  }
}

export default Fitbit;
