import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['day'],
  classNameBindings: [
    'current:current',
    'firstOfNextMonth:firstOfNextMonth'
  ],
  init() {
    this._super(...arguments);
    this.number = this.day.format("DD")
    this.current = this.selected.month() === this.day.month()
  },
  click() {
    this.selectDay(this.day)
  }
});
