import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {formatDate} from '../utils/format';

class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { appointment: props.appointment }
  }
  
  static propTypes = {
    appointment: PropTypes.object.isRequired
  }

  static defaultProps = {
    appointment: {}
  }

  componentDidMount() {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: this.props.match.url,
        dataType: "JSON"
      }).done(data => {
        this.setState({appointment: data});
      })
    }
  }

  render() {
    return(
      <div className='appointment' key={this.key}>
        <Link to={`/appointments/${this.state.appointment.id}`}>
          <h3>{this.state.appointment.title}</h3>
        </Link>
        <p>{formatDate(this.state.appointment.appt_time)}</p>
        <Link to={`/appointments/${this.state.appointment.id}/edit`}>
          Edit
        </Link>
      </div>
    )
  }
}

export default Appointment;