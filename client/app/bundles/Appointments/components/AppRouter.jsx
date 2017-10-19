import React from 'react';
import { BroswerRouter as Router, Route } from 'react-router-dom';
import Appointments from './Appointments';

export default props => {
  return
    <Router>
      <Route path="/" render={routeProps => {
        <Appointments {...routeProps} />
      }
    </Router>
}