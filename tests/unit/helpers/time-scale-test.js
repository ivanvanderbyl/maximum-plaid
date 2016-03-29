import { timeScale } from 'dummy/helpers/time-scale';
import { module, test } from 'qunit';

module('Unit | Helper | time scale');

// Replace this with your real tests.
test('it works', function(assert) {
  let result;

  result = timeScale([
    [new Date(2015, 5, 1), new Date(2015, 5, 5)],
    [1, 5]
  ], {});
  assert.ok(result);
  assert.equal(result(new Date(2015, 5, 2)), 2, 'date scales');

  result = timeScale([
    [new Date(2009, 0, 1, 0, 17), new Date(2009, 0, 1, 23, 42)]
  ], {
    nice: 10
  });
  assert.deepEqual(
    result.domain(),
    [new Date(2009, 0, 1), new Date(2009, 0, 2)],
    'nice works on date scales'
  );

  result = timeScale([
    [new Date(2009, 0, 1), new Date(2009, 0, 4)],
    [0, 10]
  ], {
    round: true
  });
  assert.equal(result(new Date(2009, 0, 2)), 3, 'rounding occurs');
  assert.equal(result(new Date(2009, 0, 3)), 7, 'rounding occurs');
  assert.equal(result(new Date(2009, 0, 4)), 10, 'rounding occurs');

  result = timeScale([
    [new Date(2009, 0, 1), new Date(2009, 0, 4)],
    [0, 10]
  ], {
    clamp: true
  });
  assert.equal(result(new Date(2008, 11, 15)), 0, 'min range is 0');
  assert.equal(result(new Date(2009, 2, 15)), 10, 'max range is 0');
});
