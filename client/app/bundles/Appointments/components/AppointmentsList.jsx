import React, { PropTypes } from 'react'
import Appointment from'./Appointment';

const AppointmentsList = ({appointments}) =>
  <div>
    {appointments.map((appointment) =>
      <Appointment
        key={appointment.id}
        appointment={appointment} />
    )}
  </div>

AppointmentsList.propTypes = {
  appointments: PropTypes.array.isRequired
}

AppointmentsList.defaultProps = {
  appointments: []
}

export default AppointmentsList;