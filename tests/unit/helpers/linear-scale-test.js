import { linearScale } from 'dummy/helpers/linear-scale';
import { module, test } from 'qunit';

module('Unit | Helper | linear scale');

test('creates a scale helper', function(assert) {
  let domain = [0,100];
  let range = [100, 1000];

  let result = linearScale([domain, range])(50);
  assert.equal(result, 550, 'computed correct linear scale value');
});
