/*jshint esversion: 6 */

import React, { Component } from 'react';
import Question from './Question';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Question
        dayId={this.props.dayId}
        questionId={this.props.questionId}
        questionBody={this.props.questionBody}
        />
      </div>
    );
  }
}

export default Day;
