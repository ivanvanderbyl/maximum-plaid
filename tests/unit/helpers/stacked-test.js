import { stacked } from 'dummy/helpers/stacked';
import { module, test } from 'qunit';
import Ember from 'ember';
import { stackOffsetSilhouette, stackOrderReverse } from 'd3-shape';

const {
  isArray
} = Ember;

const DATA = [
  { mpg: 12, vehicles: 580, other: 10 },
  { mpg: 15, vehicles: 420, other: 10 },
  { mpg: 18, vehicles: 1000, other: 10 },
  { mpg: 21, vehicles: 805, other: 10 },
  { mpg: 24, vehicles: 640, other: 10 },
  { mpg: 27, vehicles: 400, other: 10 },
  { mpg: 30, vehicles: 380, other: 10 },
  { mpg: 33, vehicles: 240, other: 10 },
  { mpg: 36, vehicles: 210, other: 10 },
  { mpg: 39, vehicles: 180, other: 10 },
  { mpg: 42, vehicles: 205, other: 10 },
  { mpg: 45, vehicles: 40, other: 10 },
  { mpg: 48, vehicles: 210, other: 10 }
];

module('Unit | Helper | stacked');

// Replace this with your real tests.
test('it errors with no data', function(assert) {
  assert.throws(
    () => stacked([], {}),
    'stacked requires at least 1 argument: data');
});

test('it errors if data is not an array', function(assert) {
  assert.throws(
    () => stacked([ { mpg: 48, vehicles: 210, other: 10 } ], {}),
    'last argument must be an array of objects');
});

test('it errors if no keys are provided', function(assert) {
  assert.throws(
    () => stacked([ DATA ], {}),
    'keys must be provided as non-last params or as an option');
});

test('it accepts keys as the non-last items in params', function(assert) {
  let keys = [ 'vehicles', 'other' ];
  let res = stacked([ ...keys, DATA ], {});

  assert.ok(res, 'res');
  assert.ok(isArray(res), 'res is array');
  assert.equal(res.length, 2, 'res.length');

  let [ vehiclesStack, othersStack ] = res;

  assert.equal(vehiclesStack.length, DATA.length, 'vehiclesStack.length');
  assert.equal(vehiclesStack.key, 'vehicles', 'vehiclesStack.key');
  vehiclesStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], 0, 'bar[0]');
    assert.equal(bar[1], DATA[i].vehicles, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });

  assert.equal(othersStack.length, DATA.length, 'othersStack.length');
  assert.equal(othersStack.key, 'other', 'othersStack.key');
  othersStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], DATA[i].vehicles, 'bar[0]');
    assert.equal(bar[1], DATA[i].vehicles + DATA[i].other, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });
});

test('it accepts keys as an option', function(assert) {
  let keys = [ 'vehicles', 'other' ];
  let res = stacked([ DATA ], { keys });

  assert.ok(res, 'res');
  assert.ok(isArray(res), 'res is array');
  assert.equal(res.length, 2, 'res.length');

  let [ vehiclesStack, othersStack ] = res;

  assert.equal(vehiclesStack.length, DATA.length, 'vehiclesStack.length');
  assert.equal(vehiclesStack.key, 'vehicles', 'vehiclesStack.key');
  vehiclesStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], 0, 'bar[0]');
    assert.equal(bar[1], DATA[i].vehicles, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });

  assert.equal(othersStack.length, DATA.length, 'othersStack.length');
  assert.equal(othersStack.key, 'other', 'othersStack.key');
  othersStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], DATA[i].vehicles, 'bar[0]');
    assert.equal(bar[1], DATA[i].vehicles + DATA[i].other, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });
});

test('it sets value from options', function(assert) {
  let keys = [ 'vehicles', 'other' ];
  let value = (d, k) => d[k] * 10;
  let res = stacked([ DATA ], { keys, value });

  assert.ok(res, 'res');
  assert.ok(isArray(res), 'res is array');
  assert.equal(res.length, 2, 'res.length');

  let [ vehiclesStack, othersStack ] = res;

  assert.equal(vehiclesStack.length, DATA.length, 'vehiclesStack.length');
  assert.equal(vehiclesStack.key, 'vehicles', 'vehiclesStack.key');
  vehiclesStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], 0, 'bar[0]');
    assert.equal(bar[1], DATA[i].vehicles * 10, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });

  assert.equal(othersStack.length, DATA.length, 'othersStack.length');
  assert.equal(othersStack.key, 'other', 'othersStack.key');
  othersStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], DATA[i].vehicles * 10, 'bar[0]');
    assert.equal(bar[1], DATA[i].vehicles * 10 + DATA[i].other * 10, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });
});

test('it sets order from options', function(assert) {
  let keys = [ 'vehicles', 'other' ];
  let res = stacked([ DATA ], { keys, order: stackOrderReverse });

  assert.ok(res, 'res');
  assert.ok(isArray(res), 'res is array');
  assert.equal(res.length, 2, 'res.length');

  let [ vehiclesStack, othersStack ] = res;

  assert.equal(vehiclesStack.length, DATA.length, 'vehiclesStack.length');
  assert.equal(vehiclesStack.key, 'vehicles', 'vehiclesStack.key');
  vehiclesStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], DATA[i].other, 'bar[0]');
    assert.equal(bar[1], DATA[i].other + DATA[i].vehicles, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });

  assert.equal(othersStack.length, DATA.length, 'othersStack.length');
  assert.equal(othersStack.key, 'other', 'othersStack.key');
  othersStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], 0, 'bar[0]');
    assert.equal(bar[1], DATA[i].other, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });
});

test('it sets offset from options', function(assert) {
  let keys = [ 'vehicles', 'other' ];
  let res = stacked([ DATA ], { keys, offset: stackOffsetSilhouette });

  assert.ok(res, 'res');
  assert.ok(isArray(res), 'res is array');
  assert.equal(res.length, 2, 'res.length');

  let [ vehiclesStack, othersStack ] = res;

  assert.equal(vehiclesStack.length, DATA.length, 'vehiclesStack.length');
  assert.equal(vehiclesStack.key, 'vehicles', 'vehiclesStack.key');
  vehiclesStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], (DATA[i].vehicles + DATA[i].other) / -2, 'bar[0]');
    assert.equal(bar[1], bar[0] + DATA[i].vehicles, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });

  assert.equal(othersStack.length, DATA.length, 'othersStack.length');
  assert.equal(othersStack.key, 'other', 'othersStack.key');
  othersStack.forEach((bar, i) => {
    assert.ok(isArray(bar), 'bar is array');
    assert.equal(bar.length, 2, 'bar.length');
    assert.equal(bar[0], vehiclesStack[i][1], 'bar[0]');
    assert.equal(bar[1], vehiclesStack[i][1] + DATA[i].other, 'bar[1]');

    assert.ok(bar.data, 'bar.data');
    assert.equal(bar.data.mpg, DATA[i].mpg, 'bar.data.mpg');
    assert.equal(bar.data.vehicles, DATA[i].vehicles, 'bar.data.vehicles');
    assert.equal(bar.data.other, DATA[i].other, 'bar.data.other');
  });
});
