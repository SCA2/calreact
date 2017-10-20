import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Appointments from './Appointments';
import Appointment from './Appointment';
import AppointmentForm from './AppointmentForm';
import AppHeader from './AppHeader';

const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={AppHeader} />
        <Route exact path="/" component={Appointments} />
        <Route exact path="/appointments/:id" component={Appointment} />
        <Route path="/appointments/:id/edit" component={AppointmentForm} />
      </div>
    </BrowserRouter>
  )
}

export default AppRouter;