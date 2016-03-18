import { pointScale } from 'dummy/helpers/point-scale';
import { module, test } from 'qunit';

module('Unit | Helper | point scale');

// Replace this with your real tests.
test('it works', function(assert) {
  let result;

  result = pointScale([
    ['hamilton', 'burr', 'washington'],
    [0, 100]
  ], {});

  assert.deepEqual(result.domain(), ['hamilton', 'burr', 'washington'], 'domain is established');
  assert.equal(result.range()[0], 0, 'the range is also set');

  result = pointScale([
    ['hamilton', 'burr', 'washington'],
    [0, 90]
  ], {
    padding: 0.5
  });
  assert.ok(result('hamilton') > 0, 'padding works');

  assert.throws(() => pointScale([[], []], { 'padding-inner': 10 }), 'padding-inner is not supported');
  assert.throws(() => pointScale([[], []], { 'padding-outer': 10 }), 'padding-outer is not supported');
});
