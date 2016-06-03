import { curve } from 'dummy/helpers/curve';
import { module, test } from 'qunit';

module('Unit | Helper | curve');

function isFunction(thing) {
  return typeof thing === 'function';
}

test('it returns a curve function by name', function(assert) {
  let fns = [
    'basisClosed',
    'basisOpen',
    'basis',
    'bundle',
    'cardinalClosed',
    'cardinalOpen',
    'cardinal',
    'catmullRomClosed',
    'catmullRomOpen',
    'catmullRom',
    'linearClosed',
    'linear',
    'natural',
    'step',
    'monotone',
    'monotoneX',
    'monotoneY'
  ];

  assert.expect(fns.length);

  fns.forEach((name) => {
    assert.ok(isFunction(curve([name])), `${name} is available`);
  });
});

test('it accepts dasherized named', function(assert) {
  assert.ok(isFunction(curve(['catmull-rom-closed'])), `catmull-rom-closed is available`);
});

test('it tests is curve is present', function(assert) {
  assert.throws(function() {
    curve(['not-a-curve']);
  }, 'curve is not available');
});
