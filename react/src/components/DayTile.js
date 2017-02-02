/*jshint esversion: 6 */

import React, { Component} from 'react';

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

  render() {
    let displayDate = this.props.displayDate;
    let questionBody = this.props.questionBody;
    let display;
    if (this.state.hover) {
      display = displayDate;
    } else {
      display = questionBody;
    }

    return (
      <div className="day-tile small-12 medium-6 large-3 columns"
        onMouseOver={() => this.hoverOn()} onMouseOut={() => this.hoverOff()}>
        <span>{display}</span>
      </div>
    );
  }
}

export default DayTile;
