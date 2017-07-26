import { area } from 'dummy/helpers/area';
import { module, test } from 'qunit';

module('Unit | Helper | area');

test('it returns an area hash', function(assert) {
  let result = area([640, 320], { margin: '24 16' });

  assert.deepEqual(result, {
    'top': 24,
    'left': 16,
    'bottom': 296,
    'right': 624,
    'height': 320 - 24 - 24,
    'width': 640 - 16 - 16,
    'outerHeight': 320,
    'outerWidth': 640,
    'margin': { 'top': 24, 'right': 16, 'bottom': 24, 'left': 16 }
  }, 'contains correct area attributes');
});
