import { scaleValue } from 'dummy/helpers/scale-value';
import { module, test } from 'qunit';

module('Unit | Helper | scale value');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.expect(3);

  scaleValue([(a, b) => {
    assert.equal(a, 1, 'the argument is passed');
    assert.equal(b, 2, 'the argument is passed');
  }, 1, 2]);


  assert.throws(() => {
    scaleValue(['howdy']);
  }, 'a non-function type scale will throw');
});
