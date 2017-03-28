import Ember from 'ember';

export default Ember.Component.extend({
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
