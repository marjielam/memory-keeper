/*jshint esversion: 6 */

import React, { Component} from 'react';
import { browserHistory } from 'react-router';

class DayTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  hoverOn() {
    this.setState({ hover: true });
  }

  hoverOff() {
    this.setState({ hover: false });
  }

  handleClick() {
    browserHistory.push(`days/${this.props.dayId}`);
  }

  render() {
    let displayDate = this.props.displayDate;
    let questionBody = this.props.questionBody;
    let display;
    if (this.state.hover) {
      display = displayDate;
    } else {
      display = questionBody;
    }

    if (this.props.end == "true") {
      return (
        <div className="day-tile small-12 medium-6 large-3 columns end"
          onMouseOver={() => this.hoverOn()} onMouseOut={() => this.hoverOff()}
          onClick={() => this.handleClick()} >
          <span>{display}</span>
        </div>
      );
    } else {
      return (
        <div className="day-tile small-12 medium-6 large-3 columns"
          onMouseOver={() => this.hoverOn()} onMouseOut={() => this.hoverOff()}
          onClick={() => this.handleClick()} >
          <span>{display}</span>
        </div>
      );
    }
  }
}

export default DayTile;
