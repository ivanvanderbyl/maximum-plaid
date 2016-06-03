import { pairBy } from 'dummy/helpers/pair-by';
import { module, test } from 'qunit';

module('Unit | Helper | pair by');

test('it returns an array with values for each attribute', function(assert) {
  let data = [
    { timestamp: 1450345920000, value: 1, projectId: 200 },
    { timestamp: 1450345930000, value: 2, projectId: 200 },
    { timestamp: 1450345940000, value: 3, projectId: 200 },
    { timestamp: 1450345950000, value: 4, projectId: 200 },
    { timestamp: 1450345960000, value: 5, projectId: 200 }
  ];

  let result = pairBy(['timestamp', 'value', data]);
  assert.deepEqual(result, [
    [1450345920000, 1],
    [1450345930000, 2],
    [1450345940000, 3],
    [1450345950000, 4],
    [1450345960000, 5]
  ]);
});
