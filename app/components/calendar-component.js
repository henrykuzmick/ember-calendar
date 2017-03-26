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
        this.$('.monthSlider').css("top", 0);
        this.$('.month').last().css("top", 0);
      })
    }
  },
  init() {
    this._super(...arguments);
    this.months = [moment()];
    this.animating = false;
  }
});
