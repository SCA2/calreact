import React, { PropTypes } from 'react';
import Label from './Label';
import Datetime from 'react-datetime';
import moment from 'moment';
import update from 'immutability-helper';
import { validations } from '../utils/validations';
import { FormErrors } from './FormErrors';

class AppointmentForm extends React.Component {

  static propTypes = {
    handleNewAppointment: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      title: {value: '', valid: false},
      appt_time: {value: new Date(), valid: false},
      formErrors: {},
      formValid: false,
      editing: false
    }

    this.formValidations = {
      title: [
        (s) => { return validations.checkMinLength(s, 3) }
      ],
      
      appt_time: [
        (t) => { return validations.checkAppTime(t) }
      ]
    }

    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  componentDidMount() {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: `/appointments/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done(data => {
        this.setState({
          title: {value: data.title, valid: true},
          appt_time: {value: data.appt_time, valid: true},
          editing: this.props.match.path === '/appointments/:id/edit'
        });
      })
    }
  }

  handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.onUserInput(fieldName, fieldValue, this.formValidations[fieldName]);
  }

  setAppTime = (e) => {
    const fieldName = 'appt_time'
    const fieldValue = e.toDate();
    this.onUserInput(fieldName, fieldValue, this.formValidations[fieldName]);
  }

  onUserInput(fieldName, fieldValue, validations) {
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

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.state.editing
    ? this.updateAppointment()
    : this.addAppointment();
  }

  addAppointment() {
    const appointment = {
      title: this.state.title.value,
      appt_time: this.state.appt_time.value
    }

    $.ajax({
      url: '/appointments',
      type: 'POST',
      data: {appointment: appointment},
      success: () => {
        this.props.handleNewAppointment(appointment);
        this.resetFormErrors();
      },
      error: (response) => {
        this.setState({
          formErrors: response.responseJSON,
          formValid: false
        });
      }
    })
  }

  updateAppointment() {
    const appointment = {
      title: this.state.title.value,
      appt_time: this.state.appt_time.value
    }

    $.ajax({
      url: `/appointments/${this.props.match.params.id}`,
      type: 'PATCH',
      data: {appointment: appointment},
      success: () => {
        console.log('appointment updated');
        this.resetFormErrors();
      },
      error: (response) => {
        this.setState({
          formErrors: response.responseJSON,
          formValid: false
        });
      }
    })
  }

  deleteAppointment() {
    if(confirm("Are you sure?")) {
      $.ajax({
        type: "DELETE",
        url: `/appointments/${this.props.match.params.id}`
      })
      .done(data => {
        this.props.history.push('/');
        this.resetFormErrors()
      })
      .fail(response => {
        console.log('appointment delete failed');
      })
    }
  }

  resetFormErrors() {
    this.setState({formErrors: {}});
  }

  render() {
    const inputProps = {
      name: 'appt_time'
    }

    return (
      <div>
        <h2>
          {this.state.editing
            ? 'Update appointment'
            : 'Make a new appointment'}
        </h2>
        <FormErrors formErrors={this.state.formErrors} />
        <Label label='Enter a title, date, and time'/>
        <form onSubmit={this.handleFormSubmit}>
          <input
            name='title'
            placeholder='Appointment Title'
            value={this.state.title.value}
            onChange={this.handleChange} />
          <Datetime
            input={false}
            open={true}
            inputProps={inputProps}
            value={moment(this.state.appt_time.value)}
            onChange={this.setAppTime} />
          <input
            type='submit'
            value={this.state.editing ? 'Update Appointment' : 'Make Appointment'}
            className='submit-button'
            disabled={!this.state.formValid} />
        </form>
        {this.state.editing && (
          <p>
            <button onClick={this.deleteAppointment}>
              Delete appointment
            </button>
          </p>
        )}
      </div>
    )
  }
}

export default AppointmentForm;