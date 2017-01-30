import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import Day from './components/Day';
import DayIndex from './components/DayIndex';

$(function() {
  if (document.getElementById('day-show')) {
    ReactDOM.render(
      <Day />,
      document.getElementById('day-show')
    );
  } else if (document.getElementById('day-index')) {
    ReactDOM.render(
      <DayIndex />,
      document.getElementById('day-index')
    );
  }
});
