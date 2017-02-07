const AppointmentsList = ({appointments}) =>
  <div>
    {appointments.map((appointment) =>
      <Appointment
        key={appointment.id}
        appointment={appointment} />
    )}
  </div>
