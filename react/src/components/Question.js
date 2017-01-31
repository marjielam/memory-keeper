/*jshint esversion: 6 */

import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerStatus: "new",
      answer: ""
    };
    this.getAnswer = this.getAnswer.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.saveNewAnswer = this.saveNewAnswer.bind(this);
    this.openEditForm = this.openEditForm.bind(this);
    this.editAnswer = this.editAnswer.bind(this);
  }

  componentDidMount() {
    this.getAnswer();
  }

  getAnswer() {
    fetch(`/api/v1/days/${this.props.dayId}/answers`)
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
      let answer = body;
      if (answer != null) {
        if (/\S/.test(answer.body)) {
          this.setState({
            answer: answer,
            answerStatus: "complete"
          });
        } else {
          this.setState({
            answer: answer,
            answerStatus: "editing"
          });
        }
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  saveNewAnswer() {
    let answerBody = document.getElementById('answer').value;
    let answerData = {
      'answer': {
        'body': answerBody,
        'questionId': this.props.questionId
      }
    };
    let jsonStringData = JSON.stringify(answerData);
    fetch(`/api/v1/days/${this.props.dayId}/answers`, {
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
      let answer = body;
      if (/\S/.test(answer.body)) {
        this.setState({
          answer: answer,
          answerStatus: 'complete'
        });
      } else {
        this.setState({
          answer: answer,
          answerStatus: 'editing'
        });
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  openEditForm() {
    this.setState({ answerStatus: "editing" });
  }

  editAnswer() {
    let answerBody = document.getElementById('answer').value;
    let answerData = {
      'answer': {
        'body': answerBody,
        'questionId': this.props.questionId
      }
    };
    let jsonStringData = JSON.stringify(answerData);
    fetch(`/api/v1/days/${this.props.dayId}/answers/${this.state.answer.id}`, {
      method: 'put',
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
      let answer = body;
      if (/\S/.test(answer.body)) {
        this.setState({
          answer: answer,
          answerStatus: 'complete'
        });
      } else {
        this.setState({
          answer: answer,
          answerStatus: 'editing'
        });
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getMonthDisplay(int) {

  }

  render() {
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
    let date = new Date(this.props.dayDate);
    let displayDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    let answer;
    if (this.state.answerStatus == "new") {
      answer =
      <div>
        <input type="text" id="answer" />
        <button className="save-answer" onClick={() => this.saveNewAnswer()}>Save</button>
      </div>;
    } else if (this.state.answerStatus == "complete") {
      answer =
      <div>
        {this.state.answer.body}
        <button className="edit-answer" onClick={() => this.openEditForm()}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
      </div>;
    } else if (this.state.answerStatus == "editing") {
      answer =
      <div>
        <input type="text" id="answer" defaultValue={this.state.answer.body}/>
        <button className="save-answer" onClick={() => this.editAnswer()}>Save</button>
      </div>;
    }
    return (
      <div className="daily-question">
        <h2>{displayDate}</h2>
        <p className="question-body">{this.props.questionBody}</p>
        {answer}
      </div>
    );
  }
}

export default Question;
