import moment from 'moment';

export const validations = {
  checkMinLength: function(text, minLength) {
    if(text.length >= minLength) {
      return '';
    } else {
      return `length should be at least ${minLength} characters`;
    }
  },

  checkAppTime: function(appt_time) {
    if(moment(appt_time).isValid() && moment(appt_time).isAfter()) {
      return '';
    } else {
      return "appointment can't be in the past";
    }
  }
}
