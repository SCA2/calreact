class Appointments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
      title: 'Appointment title',
      appt_time: 'Date and Time'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addAppointment = this.addAppointment.bind(this)
  }

  handleChange(obj) {
    this.setState(obj)
  }

  handleSubmit() {
    var appointment = {
      title: this.state.title,
      appt_time: this.state.appt_time
    }
    $.ajax({
      url: '/appointments',
      type: 'POST',
      data: {appointment: appointment},
      success: () => {
        console.log('Successfully added appointment' + appointment.id);
        this.addAppointment(appointment);
      }
    })
  }

  addAppointment(appointment) {
    let newState = this.state.appointments.concat(appointment);
    newState = newState.sort((a, b) => {
      return new Date(a.appt_time) - new Date(b.appt_time)
    })
    this.setState({appointments: newState});
  }

  render() {
    return (
      <div>
        <AppointmentForm
          title={this.state.title}
          appt_time={this.state.appt_time}
          onChange={this.handleChange}
          onFormSubmit={this.handleSubmit} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}