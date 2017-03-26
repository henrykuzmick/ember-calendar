import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['day'],
  classNameBindings: [
    'day.current:current',
    'day.firstOfNextMonth:firstOfNextMonth'
  ],
  init() {
    this._super(...arguments);
  }
});
