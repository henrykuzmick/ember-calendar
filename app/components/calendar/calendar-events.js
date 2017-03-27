import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.todayWord = this.today.format("dddd, MMMM Do");
  },
  didReceiveAttrs() {
    this._super(...arguments);
    // TODO: create helper for formating
    this.set('todayWord', this.today.format("dddd, MMMM Do"))
  },
  didRender() {
    this.$('.clockpicker').timepicker({ 'timeFormat': 'H:i' });

  },
  actions: {
    addEvent: function() {
      let body = this.get('body');
      let time = this.get('time');
      this.addEvent(body, time);
    }
  }
});
