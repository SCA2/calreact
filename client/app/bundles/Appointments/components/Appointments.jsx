import React, { PropTypes } from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';
import update from 'immutability-helper';

class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  static defaultProps = {
    appointments: []
  }

  constructor(props) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
    }
  }

  componentDidMount() {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: '/appointments',
        dataType: "JSON"
      }).done(data => {
        this.setState({appointments: data});
      })
    }
  }

  addAppointment = (appointment) => {
    let newState = update(this.state.appointments, {$push: [appointment]});
    newState = newState.sort((a, b) => {
      return new Date(a.appt_time) - new Date(b.appt_time)
    })
    this.setState({appointments: newState});
  }

  render() {
    return (
      <div>
        <AppointmentForm handleNewAppointment={this.addAppointment} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}

export default Appointments;