import box from 'dummy/utils/box-expression';
import { module, test } from 'qunit';

module('Unit | Utility | box expression');

test('parsing string to object', function(assert) {
  let result = box('10 20');
  assert.deepEqual(result, {
    'bottom': 10,
    'left': 20,
    'right': 20,
    'top': 10
  }, 'Accepts top and left margin convention');
});

test('parsing object to object', function(assert) {
  let result = box({
    'bottom': 10,
    'left': 20,
    'right': 20,
    'top': 10
  });

  assert.deepEqual(result, {
    'bottom': 10,
    'left': 20,
    'right': 20,
    'top': 10
  }, 'Accepts top and left margin convention');
});

test('parsing object with missing sides', function(assert) {
  let result = box({
    'bottom': 10,
    'left': 20,
  });

  assert.deepEqual(result, {
    'bottom': 10,
    'left': 20,
    'right': 0,
    'top': 0
  }, 'Accepts top and left margin convention');
});

