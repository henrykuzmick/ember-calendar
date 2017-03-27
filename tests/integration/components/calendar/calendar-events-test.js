import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('calendar/calendar-events', 'Integration | Component | calendar/calendar events', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{calendar/calendar-events}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#calendar/calendar-events}}
      template block text
    {{/calendar/calendar-events}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
