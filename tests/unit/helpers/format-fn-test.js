import { formatFn } from 'dummy/helpers/format-fn';
import { module, test } from 'qunit';

module('Unit | Helper | format fn');

test('it returns a function representing a format', function(assert) {
  let result = formatFn(['$0.3s'])(12345);

  assert.deepEqual(result, '$12.3k', 'calling format returns a formatted value');
});
