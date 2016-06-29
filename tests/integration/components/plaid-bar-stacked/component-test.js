import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plaid-bar-stacked', 'Integration | Component | plaid bar stacked', {
  integration: true
});

test('it renders', function(assert) {
  this.set('items', [
    { mpg: 12, vehicles: 580, other: 10 },
    { mpg: 15, vehicles: 420, other: 10 },
    { mpg: 18, vehicles: 1000, other: 10 },
    { mpg: 21, vehicles: 805, other: 10 },
    { mpg: 24, vehicles: 640, other: 10 },
    { mpg: 27, vehicles: 400, other: 10 },
    { mpg: 30, vehicles: 380, other: 10 },
    { mpg: 33, vehicles: 240, other: 10 },
    { mpg: 36, vehicles: 210, other: 10 },
    { mpg: 39, vehicles: 180, other: 10 },
    { mpg: 42, vehicles: 205, other: 10 },
    { mpg: 45, vehicles: 40, other: 10 },
    { mpg: 48, vehicles: 210, other: 10 }
  ]);

  // Template block usage:
  this.render(hbs`
    {{#with (area 110 1000) as |plotArea|}}
      {{#with (stacked 'vehicles' 'other' items) as |stackedData|}}
        {{#plaid-plot
            xScale=(band-scale (map-by 'mpg' items) (array 0 plotArea.width))
            yScale=(linear-scale (extent (flatten stackedData) toZero=true) (array plotArea.height 0))
            plotArea=plotArea as |plot|}}

          {{plot.barStacked stackedData stackBy=y.key}}

        {{/plaid-plot}}
      {{/with}}
    {{/with}}
  `);

  assert.equal(this.$('.bar-group').length, 2, 'number of bar groups');
  assert.equal(this.$('.bar').length, this.get('items.length') * 2, 'number of bars');
});
