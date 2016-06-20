import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plaid-axis', 'Integration | Component | plaid axis', {
  integration: true
});

test('it renders an axis', function(assert) {
  this.set('timeSeriesData', [
    { timestamp: 1450345920000, value: 1, projectId: 200 },
    { timestamp: 1450345930000, value: 2, projectId: 200 },
    { timestamp: 1450345940000, value: 3, projectId: 200 },
    { timestamp: 1450345950000, value: 4, projectId: 200 },
    { timestamp: 1450345960000, value: 5, projectId: 200 }
  ]);

  this.render(hbs`
    {{#with (area 664 220 margin="0 50 72 16") as |plotArea|}}
      {{#plaid-plot
          (time-scale (extent (map-by "timestamp" timeSeriesData)) (array 0 plotArea.width))
          (linear-scale (extent (map-by "value" timeSeriesData) toZero=true) (array plotArea.height 0))
          plotArea as |plot|}}

        {{#with (pair-by "timestamp" "value" timeSeriesData) as |values|}}
          {{plot.left-axis values ticks=values.length}}
        {{/with}}
      {{/plaid-plot}}
    {{/with}}
  `);

  assert.equal(this.$('.axis').length, 1, 'number of axes');

  let ticks = this.$('.tick');
  assert.equal(ticks.length, this.get('timeSeriesData.length') + 1, 'number of ticks');

  assert.equal(this.$(ticks[0]).find('text').text(), 0, 'tick 0 text');

  for (let i = 1; i < ticks.length; ++i) {
    assert.equal(this.$(ticks[i]).find('text').text(), this.get(`timeSeriesData.${i - 1}.value`), `tick ${i} text`);
  }
});
