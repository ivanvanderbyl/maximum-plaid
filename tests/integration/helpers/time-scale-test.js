import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('time-scale', 'Integration | Helper | time scale', {
  integration: true
});

test('it generates ticks', function(assert) {
  let start = new Date(2016, 2, 1);
  let end = new Date(2016, 2, 31);
  this.set('domain', [start, end]);

  this.render(hbs`
    {{#with (time-scale domain) as |scale|}}
      {{#each (scale-ticks scale (time-interval 'day')) as |tickValue|}}
        <a>{{tickValue}}</a>
      {{/each}}
    {{/with}}
  `);

  assert.equal(this.$('a').length, 31, 'it generates 31 ticks');
  assert.equal(this.$('a:eq(0)').text().trim(), start.toString());
});
