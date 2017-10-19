import React, { PropTypes } from 'react';
import Label from './Label';
import Datetime from 'react-datetime';
import moment from 'moment';
import { validations } from '../utils/validations';

class AppointmentForm extends React.Component {
  static propTypes = {
    title: PropTypes.shape({
      value: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired
    }).isRequired,
    appt_time: PropTypes.shape({
      value: PropTypes.instanceOf(Date).isRequired,
      valid: PropTypes.bool.isRequired
    }).isRequired,
    formValid: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setAppTime = this.setAppTime.bind(this)

    this.formValidations = {
      title: [
        (s) => { return validations.checkMinLength(s, 3) }
      ],
      
      appt_time: [
        (t) => { return validations.checkAppTime(t) }
      ]
    }
  }

  handleChange(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.props.onChange(fieldName, fieldValue, this.formValidations[fieldName]);
  }

  setAppTime(e) {
    const fieldName = 'appt_time'
    const fieldValue = e.toDate();
    this.props.onChange(fieldName, fieldValue, this.formValidations[fieldName]);
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onFormSubmit()
  }

  render() {
    const inputProps = {
      name: 'appt_time'
    }

    return (
      <div>
        <h2>Make a new appointment</h2>
        <Label label='Enter a title, date, and time'/>
        <form onSubmit={this.handleSubmit}>
          <input
            name='title'
            placeholder='Appointment Title'
            value={this.props.title.value}
            onChange={this.handleChange} />
          <Datetime
            input={false}
            open={true}
            inputProps={inputProps}
            value={moment(this.props.appt_time.value)}
            onChange={this.setAppTime} />
          <input
            type='submit'
            value='Make Appointment'
            className='submit-button'
            disabled={!this.props.formValid} />
        </form>
      </div>
    )
  }
}

export default AppointmentForm;