/*jshint esversion: 6 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Day from './components/Day';
import DayIndex from './components/DayIndex';
import Calendar from './components/Calendar';
import MemoriesIndex from './components/MemoriesIndex';

$(function() {
  if (document.getElementById('current-user-id')) {
    let currentUserId = parseInt(document.getElementById('current-user-id').value);

    let DayIndexWrapper = React.createClass({
      render: function () {
        return (
            <DayIndex
            currentUserId={currentUserId}
            />
        );
      }
    });

    let DayWrapper = React.createClass({
      render: function () {
        return (
            <Day
            key={this.props.params.id}
            dayId={this.props.params.id}
            currentUserId={currentUserId}
            />
        );
      }
    });

    if (document.getElementById('calendar')) {
      ReactDOM.render(
        <Calendar
        currentUserId={currentUserId}
        />,
        document.getElementById('calendar')
      );
    }

    if (document.getElementById('app')) {
      ReactDOM.render(
        <Router history={browserHistory}>
          <Route path="/" component={DayIndexWrapper} />
          <Route path="days/:id" component={DayWrapper} />
          <Route path="memories" component={MemoriesIndex} />
        </Router>,
        document.getElementById('app')
      );
    }
  }
});
