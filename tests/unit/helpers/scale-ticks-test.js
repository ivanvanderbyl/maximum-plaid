import d3Proxy from 'ember-d3-scale/utils/d3-proxy';
import { scaleTicks } from 'dummy/helpers/scale-ticks';
import { module, test } from 'qunit';

module('Unit | Helper | scale ticks');

// Replace this with your real tests.
test('it requires a `ticks` function', function(assert) {
  assert.throws(() => {
    scaleTicks([42]);
  }, '42 does not have a ticks function');

  let scale, result;

  scale = d3Proxy('scale', 'linear')();
  result = scaleTicks([scale]);
  assert.equal(result.length, 11, 'there are 11 ticks by default');

  result = scaleTicks([scale, 5]);
  assert.equal(result.length, 6, 'there are 6 ticks by default');

  scale = d3Proxy('scale', 'time')();
  scale.domain([new Date(2015, 0, 1), new Date(2015, 0, 2)]);
  result = scaleTicks([scale, d3Proxy('time', 'minute'), 5]);
  assert.equal(result[1] - result[0], 1000 * 60 * 5, 'each step is 5 minutes');

  scale = d3Proxy('scale', 'time')();
  scale.domain([new Date(2015, 0, 1), new Date(2015, 0, 2)]);
  result = scaleTicks([scale, d3Proxy('time', 'minute'), 10]);
  assert.equal(result[1] - result[0], 1000 * 60 * 10, 'each step is 10 minutes');
});
