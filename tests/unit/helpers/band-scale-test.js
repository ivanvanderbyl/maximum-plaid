import { bandScale } from 'dummy/helpers/band-scale';
import { module, test } from 'qunit';

module('Unit | Helper | band scale');

// Replace this with your real tests.
test('it works', function(assert) {
  let result;

  result = bandScale([
    ['hamilton', 'burr', 'washington'],
    [0, 100]
  ], {});
  assert.deepEqual(result.domain(), ['hamilton', 'burr', 'washington'], 'domain is established');
  assert.deepEqual(result.range(), [0, 100], 'the range is also set');

  result = bandScale([
    ['hamilton', 'burr'],
    [0, 50]
  ], {
    padding: 0.5
  });
  assert.deepEqual(result.range(), [0, 50], 'the range is also set');
  assert.equal(result('hamilton'), 10, 'padding works');
});
