import { linearScale } from 'dummy/helpers/linear-scale';
import { module, test } from 'qunit';

module('Unit | Helper | linear scale');

// Replace this with your real tests.
test('basic functionality works', function(assert) {
  let result = linearScale([[0, 10], [0, 1]], {});
  assert.equal(typeof result, 'function', 'it returns a function');
  assert.equal(result(0), 0, 'it maps properly');
  assert.equal(result(10), 1, 'it maps properly');
  assert.equal(result(5), 0.5, 'it maps properly');
  assert.equal(result(15), 1.5, 'it maps properly');
  assert.equal(result(-5), -0.5, 'it maps properly');
});

test('range round functionality', function(assert) {
  let result;
  result = linearScale([[0, 1], [0, 10]], {});
  assert.approximate(result(0.59), 5.9, 'no rounding done');

  result = linearScale([[0, 1], [0, 10]], { round: true });
  assert.approximate(result(0.59), 6, 'with rounding done');
});

test('clamping values', function(assert) {
  let result = linearScale([[0, 10], [0, 1]], {
    clamp: true
  });

  assert.equal(result(0), 0, 'it maps properly');
  assert.equal(result(10), 1, 'it maps properly');
  assert.equal(result(5), 0.5, 'it maps properly');
  assert.equal(result(15), 1, 'it maps properly');
  assert.equal(result(-5), 0, 'it maps properly');
});

test('nice values', function(assert) {
  let result;

  result = linearScale([[0, 9.999], [0, 10]], {});
  assert.deepEqual(result.domain(), [0, 9.999], 'no niceness');

  result = linearScale([[0, 9.999], [0, 10]], {
    nice: 2
  });
  assert.deepEqual(result.domain(), [0, 10], 'with domain niceness');
});
