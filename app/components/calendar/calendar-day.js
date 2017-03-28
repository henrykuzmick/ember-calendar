import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['day'],
  classNameBindings: [
    'current',
    'firstOfNextMonth',
    'firstOfThisMonth',
    'lastOfPrevMonth',
    'selected',
    'today'
  ],
  init() {
    this._super(...arguments);
    this.current = this.selectedMonth.isSame(this.day, 'month');
    this.firstOfNextMonth = this.day.isSame(this.selectedMonth.clone().add('months', 1).date(1), 'day');
    this.lastOfPrevMonth = this.day.isSame(this.selectedMonth.clone().date(1).subtract('days', 1), 'day');
    this.firstOfThisMonth = this.day.isSame(this.selectedMonth.clone().date(1), 'day');
    this.selected = this.day.isSame(this.selectedDay, 'day');
    this.today = this.day.isSame(moment(), 'day')
    this.eventsToday = this.filterEvents();
  },
  click() {
    this.selectDay(this.day)
  },
  filterEvents() {
    let filteredEvents = [];
    this.events.map((event) => {
      if(moment(event.get('time')).isSame(this.day, 'day')) {
        filteredEvents.push(event);
      }
    });
    return filteredEvents;
  }
});
