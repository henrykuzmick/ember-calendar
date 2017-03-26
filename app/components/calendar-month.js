import Ember from 'ember';

export default Ember.Component.extend({
  days: [],
  totalDays: 42,
  classNames: ['month', 'clearfix'],

  didReceiveAttrs() {
    this._super(...arguments);
    this.firstDay = this.month.date(1);
    this.fillDays();
  },
  fillDays() {
    this.set('days', []);
    this.fillPast();
    this.fillCurrent();
    this.fillFuture();
  },
  fillPast() {
    let clone = this.firstDay.clone();
    let dayOfWeek = clone.day();
    if(dayOfWeek === 0) { return; }

    clone.subtract('days', dayOfWeek+1);

    for(var i = dayOfWeek; i > 0 ; i--) {
      this.addDay(clone.add('days', 1));
    }
  },
  fillCurrent() {
    let clone = this.firstDay.clone();
    while(clone.month() === this.firstDay.month()) {
      this.addDay(clone);
      clone.add('days', 1);
    }
  },
  fillFuture() {
    let clone = this.firstDay.clone().add('months', 1);
    while(this.days.length !== this.totalDays) {
      this.addDay(clone);
      clone.add('days', 1);
    }
  },
  addDay(day) {
    const current = day.month() === this.firstDay.month();
    const firstOfNextMonth = day.format() == this.firstDay.clone().add('months', 1).date(1).format()
    console.log()
    this.days.push({
      number: day.format("DD"),
      current,
      firstOfNextMonth
    });
  }
});
