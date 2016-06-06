import { area } from 'dummy/helpers/area';
import { module, test } from 'qunit';

module('Unit | Helper | area');

test('it returns an area hash', function(assert) {
  let result = area([640, 320], { margin: '24 16' });
  assert.deepEqual(result, {
    'bottom': 296,
    'height': 272,
    'left': 16,
    'outerHeight': 320,
    'outerWidth': 640,
    'right': 624,
    'top': 24,
    'width': 608,
    'margin': { 'top': 24, 'left': 16, 'bottom': 24, 'right': 16 }
  }, 'contains correct area attributes');
});
