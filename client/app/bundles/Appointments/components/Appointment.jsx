import React from 'react';
import {formatDate} from '../utils/format';

const Appointment = ({appointment}) =>
  <div className='appointment'>
    <h3>{appointment.title}</h3>
    <p>{formatDate(appointment.appt_time)}</p>
  </div>

export default Appointment;