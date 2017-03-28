import Ember from 'ember';

export default Ember.Component.extend({
  time: '09:00',
  didRender() {
    this.$('.clockpicker').timepicker({
      'timeFormat': 'H:i',
      'scrollDefault': '09:00'
    });
  },
  actions: {
    addEvent: function() {
      let body = this.get('body');
      let time = this.get('time');
      if($.trim(body)) {
        this.addEvent(body, time);
        this.set('body', '');
        this.set('time', '09:00')
      }
    },
    removeEvent: function(id) {
      this.removeEvent(id)
    }
  }
});
