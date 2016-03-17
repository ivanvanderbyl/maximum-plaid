import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('scale-ticks', 'Integration | Helper | scale ticks', {
  integration: true
});

test('it generates ticks', function(assert) {
  this.set('domain', [0, 10]);
  this.set('range', [0, 100]);

  this.render(hbs`
    {{#with (linear-scale domain range) as |scale|}}
      {{#each (scale-ticks scale 11) as |tickValue|}}
        <a>{{scale-value scale tickValue}}</a>
      {{/each}}
    {{/with}}
  `);

  assert.equal(this.$('a').length, 11, 'it generates 11 ticks');
});
