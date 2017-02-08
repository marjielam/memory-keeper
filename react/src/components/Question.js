/*jshint esversion: 6 */

import React, { Component } from 'react';
import PreviousAnswer from './PreviousAnswer';
import { browserHistory } from 'react-router';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayId: this.props.dayId,
      answerStatus: "new",
      answer: "",
      previousAnswers: [],
      showPreviousAnswers: false
    };
    this.handlePreviousAnswerClick = this.handlePreviousAnswerClick.bind(this);
  }

  componentDidMount() {
    this.getAnswer();
    this.getPreviousAnswers();
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

  getPreviousAnswers() {
    fetch(`/api/v1/users/${this.props.currentUserId}/days/${this.props.dayId}/previous_answers`)
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
      let answers = body;
      this.setState({ previousAnswers: answers });
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

  togglePreviousAnswers() {
    let newState = !this.state.showPreviousAnswers;
    this.setState({ showPreviousAnswers: newState });
  }

  handlePreviousAnswerClick(dayId) {
    browserHistory.push(`/days/${dayId}`);
  }

  render() {
    let displayDate = this.getDisplayDate(this.props.dayDate, "full");

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
        <span className="answer">{this.state.answer.body}</span>
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

    let previousAnswerList = this.state.previousAnswers.map(answerData => {
      let displayDate = this.getDisplayDate(answerData.day.date, "year");
      return (
        <PreviousAnswer
        key={answerData.answer.id}
        id={answerData.answer.id}
        body={answerData.answer.body}
        dayId={answerData.day.id}
        handlePreviousAnswerClick={this.handlePreviousAnswerClick}
        displayDate={displayDate}
        />
      );
    });

    let showPreviousAnswers;
    if (this.state.showPreviousAnswers) {
      showPreviousAnswers =
      <div className="previous-answers">
        <h3 onClick={() => this.togglePreviousAnswers()}><i className="fa fa-minus" aria-hidden="true"></i>Hide previous answers</h3>
        <ul className="previous-answers-list">{previousAnswerList}</ul>
      </div>;
    } else {
      showPreviousAnswers =
      <div className="previous-answers">
        <h3 onClick={() => this.togglePreviousAnswers()}><i className="fa fa-plus" aria-hidden="true"></i>Show previous answers</h3>
      </div>;
    }

    return (
      <div className="daily-question">
        <h2>{displayDate}</h2>
        <p className="question-body">{this.props.questionBody}</p>
        {answer}
        {showPreviousAnswers}
      </div>
    );
  }
}

export default Question;
