import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('plaid-bar', 'Integration | Component | plaid bar', {
  integration: true
});

test('it renders a bar chart', function(assert) {
  this.set('fuelEconomy', [
    { mpg: 12, vehicles: 580 },
    { mpg: 15, vehicles: 420 },
    { mpg: 18, vehicles: 1000 },
    { mpg: 21, vehicles: 805 },
    { mpg: 24, vehicles: 640 },
    { mpg: 27, vehicles: 400 },
    { mpg: 30, vehicles: 380 },
    { mpg: 33, vehicles: 240 },
    { mpg: 36, vehicles: 210 },
    { mpg: 39, vehicles: 180 },
    { mpg: 42, vehicles: 205 }
  ]);

  this.render(hbs`
    {{#with (area 110 1000) as |plotArea|}}
      {{#plaid-plot
          xScale=(band-scale (map-by 'mpg' fuelEconomy) (array 0 plotArea.width))
          yScale=(linear-scale (extent (map-by 'vehicles' fuelEconomy) toZero=true) (array plotArea.height 0))
          plotArea=plotArea as |plot|}}

        {{#with (pair-by 'mpg' 'vehicles' fuelEconomy) as |values|}}

          {{plot.bar values fill='steelblue'}}

        {{/with}}
      {{/plaid-plot}}
    {{/with}}`);

  return wait()
    .then(() => {
      let bars = this.$('.bar');

      assert.ok(bars, 'bars');
      assert.equal(bars.length, this.get('fuelEconomy.length'), 'number of bars');

      for (let i = 0; i < bars.length; ++i) {
        let bar = bars[i];
        let barVehicles = this.get(`fuelEconomy.${i}.vehicles`);

        assert.equal(bar.getAttribute('y'), 1000 - barVehicles, `bar ${i} y`);
        assert.equal(bar.getAttribute('height'), barVehicles, `bar ${i} height`);

        assert.equal(bar.getAttribute('x'), i * 10, `bar ${i} x`);
        assert.equal(bar.getAttribute('width'), 10, `bar ${i} width`);
      }
    });
});
