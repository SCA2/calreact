import React, { PropTypes } from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';
import update from 'immutability-helper';
import { FormErrors } from './FormErrors';
import moment from 'moment';

class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
      title: {value: '', valid: false},
      appt_time: {value: new Date(), valid: false},
      formErrors: {},
      formValid: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addAppointment = this.addAppointment.bind(this)
    this.validateField = this.validateField.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  handleChange(fieldName, fieldValue, validations) {
    const newFieldState = update(this.state[fieldName], {value: {$set: fieldValue}});
    this.setState({[fieldName]: newFieldState}, () => {this.validateField(fieldName, fieldValue, validations)});
  }

  validateField(fieldName, fieldValue, validations) {
    let fieldValid = true;

    let fieldErrors = validations.reduce((errors, validation) => {
      let e = validation(fieldValue);
      if(e !== '') {
        errors.push(e);
        fieldValid = false;
      }
      return errors;
    }, []);

    const newFieldState = update(this.state[fieldName], {valid: {$set: fieldValid}});
    const newFormErrors = update(this.state.formErrors, {$merge: {[fieldName]: fieldErrors}})
    this.setState({[fieldName]: newFieldState, formErrors: newFormErrors}, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.title.valid && this.state.appt_time.valid})
  }

  handleSubmit() {
    var appointment = {
      title: this.state.title.value,
      appt_time: this.state.appt_time.value
    }

    $.ajax({
      url: '/appointments',
      type: 'POST',
      data: {appointment: appointment},
      success: () => {
        console.log('Successfully added appointment');
        this.addAppointment(appointment);
        this.resetFormErrors();
      },
      error: (response) => {
        console.log(response);
        this.setState({formErrors: response.responseJSON});
      }
    })
  }

  resetFormErrors() {
    this.setState({formErrors: {}});
  }

  addAppointment(appointment) {
    let newState = update(this.state.appointments, {$push: [appointment]});
    newState = newState.sort((a, b) => {
      return new Date(a.appt_time) - new Date(b.appt_time)
    })
    this.setState({appointments: newState});
  }

  render() {
    return (
      <div>
        <FormErrors formErrors={this.state.formErrors} />
        <AppointmentForm
          title={this.state.title}
          appt_time={this.state.appt_time}
          onChange={this.handleChange}
          onFormSubmit={this.handleSubmit}
          formValid={this.state.formValid} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}

export default Appointments;