import React from 'react';
import Appointment from'./Appointment';

const AppointmentsList = ({appointments}) =>
  <div>
    {appointments.map((appointment) =>
      <Appointment
        key={appointment.id}
        appointment={appointment} />
    )}
  </div>

export default AppointmentsList