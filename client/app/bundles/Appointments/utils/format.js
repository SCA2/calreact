import moment from 'moment';

export function formatDate(d) {
  return( d ? moment(d).format('MMMM DD YYYY, h:mm:ss a') : '');
};