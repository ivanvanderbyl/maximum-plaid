import { catColorScale } from 'dummy/helpers/cat-color-scale';
import { module, test } from 'qunit';

module('Unit | Helper | cat color scale');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.throws(() => {
    catColorScale([42], {});
  }, 'throws on an incorrect scale name');

  let result;
  result = catColorScale(['10'], {});
  assert.equal(result(0), '#1f77b4');

  let opts = [{}, {}];
  result = catColorScale(['10', opts], {});
  assert.equal(result(opts[0]), '#1f77b4');
  assert.notEqual(result(opts[0]), result(opts[1]));

  result = catColorScale(['20']);
  assert.ok(result, 'category 20 works');

  result = catColorScale(['20b']);
  assert.ok(result, 'category 20b works');

  result = catColorScale(['20c']);
  assert.ok(result, 'category 20c works');
});
