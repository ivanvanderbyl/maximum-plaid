import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('time-scale', 'Integration | Helper | time scale', {
  integration: true
});

test('it generates ticks', function(assert) {
  this.set('domain', [
    new Date(2016, 2, 1),
    new Date(2016, 2, 31)
  ]);

  this.render(hbs`
    {{#with (time-scale domain) as |scale|}}
      {{#each (scale-ticks scale) as |tickValue|}}
        <a>{{scale-value scale tickValue}}</a>
      {{/each}}
    {{/with}}
  `);

  assert.equal(this.$('a').length, 16, 'it generates 11 ticks');
});
