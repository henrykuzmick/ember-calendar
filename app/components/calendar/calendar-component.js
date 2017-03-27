import Ember from 'ember';
export default Ember.Component.extend({

  classNames: ['calendar'],
  actions: {
    nextMonth() {
      if(!this.animating) {
        let clone = this.months.slice();
        clone.push(this.months[0].clone().add('months', 1));
        this.set('months', clone);
        this.set('animating', true)
      }
    },
    prevMonth() {
      if(!this.animating) {
        let clone = this.months.slice();
        clone.push(this.months[0].clone().subtract('months', 1));
        this.set('months', clone);
        this.set('animating', true)
      }
    },
    selectDay(day) {
      this.set('selectedDay', day);
      this.set('selectedEvents', this.filterEvents())
    },
    addEvent: function(body, time) {
      const newEvent = this.store.createRecord('event', {
        body: body,
        time: new Date(this.selectedDay.format("YYYY,MM,DD,") + time)
      });
      newEvent.save().then(() => {
        this.set('selectedEvents', this.filterEvents())
      });
    }
  },
  didRender() {
    if(this.animating) {
      const newPos = this.$('.month').first().find('.firstOfNextMonth').position().top;
      this.$('.month').first().find('.day').removeClass('current');
      this.$('.month').last().css("top", newPos);
      this.$('.monthSlider').animate({
        top: -1 * newPos
      }, 400, () => {
        let newMonths = [];
        newMonths.push(this.months[1]);
        this.set('animating', false);
        this.set('months', newMonths);
        this.set('monthName', this.months[0].format("MMMM"))
        this.$('.monthSlider').css("top", 0);
        this.$('.month').last().css("top", 0);
      })
    }
  },
  init() {
    this._super(...arguments);
    this.months = [moment()];
    this.selectedDay = moment();
    this.monthName = this.months[0].format("MMMM");
    this.animating = false;
    this.selectedEvents = this.filterEvents();
  },
  filterEvents() {
    return this.events.map((event) => {
      if(moment(event.get('time')).format("YYYY-MM-DD") === this.selectedDay.format("YYYY-MM-DD")) {
        return event;
      }
    });
  }
});
