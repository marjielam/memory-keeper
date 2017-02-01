/*jshint esversion: 6 */

import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import Day from './components/Day';
import DayIndex from './components/DayIndex';

$(function() {
  if (document.getElementById('day-show')) {
    let dayId = parseInt(document.getElementById('day-show').dataset.id);
    let questionId = parseInt(document.getElementById('question-id').value);
    let questionBody = document.getElementById('question-body').value;
    let currentUserId = parseInt(document.getElementById('current-user-id').value);
    ReactDOM.render(
      <Day
      key={dayId}
      dayId={dayId}
      questionId={questionId}
      questionBody={questionBody}
      currentUserId={currentUserId}
      />,
      document.getElementById('day-show')
    );
  } else if (document.getElementById('day-index')) {
    ReactDOM.render(
      <DayIndex />,
      document.getElementById('day-index')
    );
  }
});
