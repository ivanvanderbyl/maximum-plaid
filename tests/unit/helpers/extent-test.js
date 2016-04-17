import { extent } from 'dummy/helpers/extent';
import { module, test } from 'qunit';

module('Unit | Helper | extent');

// // Replace this with your real tests.
// test('it works', function(assert) {
//   let result = extent([42]);
//   assert.ok(result);
// });

test('extent of flat array', function(assert) {
  let result = extent([[1,2,3,4]]);
  assert.deepEqual(result, [1,4]);
});

// test('extent of array tuples', function(assert) {
//   let result = extent([[[1, 10],[2, 10],[3, 10],[4, 10],[5, 10]], 'firstObject']);
//   assert.deepEqual(result, [1,5]);
// });

test('extent of array of objects', function(assert) {
  let result = extent([[
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5},
  ], 'value']);
  assert.deepEqual(result, [1,5]);
});
