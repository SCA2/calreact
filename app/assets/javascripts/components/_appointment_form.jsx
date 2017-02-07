class AppointmentForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setAppTime = this.setAppTime.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    const obj = {}
    obj[name] = e.target.value
    this.props.onChange(obj)
  }

  setAppTime(e) {
    const name = 'appt_time'
    const obj = {}
    if(obj[name] = e.toDate()) {
      this.props.onChange(obj)
    }
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
          <input name='title'
            value={this.props.title}
            onChange={this.handleChange} />
          <Datetime
            input={false}
            open={true}
            inputProps={inputProps}
            value={this.props.appt_time}
            onChange={this.setAppTime} />
          <input
            type='submit'
            value='Make Appointment'
            className='submit-button' />
        </form>
      </div>
    )
  }
}