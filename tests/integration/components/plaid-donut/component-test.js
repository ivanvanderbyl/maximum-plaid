import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plaid-donut', 'Integration | Component | plaid donut', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('timeSeriesData', [
    { timestamp: 1450345920000, value: 1, projectId: 200 },
    { timestamp: 1450345930000, value: 2, projectId: 200 },
    { timestamp: 1450345940000, value: 3, projectId: 200 },
    { timestamp: 1450345950000, value: 4, projectId: 200 },
    { timestamp: 1450345960000, value: 5, projectId: 200 }
  ]);

  this.render(hbs`
    {{#with (area 664 220) as |plotArea|}}
      {{#plaid-plot plotArea=plotArea as |plot|}}

        {{plot.donut (pair-by "timestamp" "value" timeSeriesData)}}

      {{/plaid-plot}}
    {{/with}}
  `);

  assert.equal(this.$('.arc').length, this.get('timeSeriesData.length'), 'number of arcs');
});
