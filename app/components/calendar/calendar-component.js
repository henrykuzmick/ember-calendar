import Ember from 'ember';
export default Ember.Component.extend({

  classNames: ['calendar'],
  actions: {
    nextMonth() {
      if(!this.animating) {
        let clone = this.selectedMonth.clone()
        clone.add('months', 1);
        this.set('newMonth', clone);
        this.set('animating', true)
      }
    },
    prevMonth() {
      if(!this.animating) {
        let clone = this.selectedMonth.clone()
        clone.subtract('months', 1);
        this.set('newMonth', clone);
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
      let newPos;
      if(this.newMonth.isAfter(this.selectedMonth)) {
        newPos = this.$('.month').first().find('.first-of-next-month').position().top;
      } else {
        newPos = this.$('.month').last().find('.first-of-this-month').position().top * -1;
      }

      this.$('.month').last().css("top", newPos);
      this.$('.monthSlider').animate({
        top: -1 * newPos
      }, 300, () => {
        this.set('selectedMonth', this.newMonth);
        this.set('newMonth', null)
        this.set('animating', false);
        // TODO: make helper for formating
        this.set('monthName', this.selectedMonth.format("MMMM"))
        this.$('.monthSlider').css("top", 0);
        this.$('.month').last().css("top", 0);
      })
    }
  },
  init() {
    this._super(...arguments);
    this.selectedMonth = moment();
    this.selectedDay = moment();
    // TODO: make helper for formating
    this.monthName = this.selectedMonth.format("MMMM");
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
