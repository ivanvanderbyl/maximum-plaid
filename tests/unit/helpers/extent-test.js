import { extent } from 'dummy/helpers/extent';
import { module, test } from 'qunit';

module('Unit | Helper | extent');

test('extent of flat array', function(assert) {
  let result = extent([[1,2,3,4]]);
  assert.deepEqual(result, [1,4]);
});

test('extent of array of objects', function(assert) {
  let result = extent([[
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 }
  ], 'value']);
  assert.deepEqual(result, [1,5]);
});
