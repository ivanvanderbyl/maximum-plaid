import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plaid-area', 'Integration | Component | plaid area', {
  integration: true
});

test('it a an area chart', function(assert) {

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

        {{plot.area (pair-by "timestamp" "value" timeSeriesData) fill="#D1C4E9"}}

      {{/plaid-plot}}
    {{/with}}
  `);

  assert.equal(this.$('path.area').attr('d'), 'M0,118.4L149.5,88.8L299,59.2L448.5,29.599999999999994L598,0L598,148L448.5,148L299,148L149.5,148L0,148Z');
});
