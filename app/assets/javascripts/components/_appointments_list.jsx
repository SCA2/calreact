class AppointmentsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.appointments.map((appointment) => {
          return (
            <Appointment
              key={appointment.id}
              appointment={appointment} />
          )
        })}
      </div>
    )
  }
}