import Ember from 'ember';

export function formatDate(params) {
  return moment(params[0]).format(params[1]);
}

export default Ember.Helper.helper(formatDate);
