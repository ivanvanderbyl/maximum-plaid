import addOptionsToOrdinalScale from 'ember-d3-scale/utils/add-options-to-ordinal-scale';
import { module, test } from 'qunit';

module('Unit | Utility | add options to ordinal scale');

// Replace this with your real tests.
test('works supporting paddingInner/Outer', function(assert) {
  let callCounts = {};
  let lastArgs = {};
  let scale = ['align', 'padding', 'paddingInner', 'paddingOuter'].reduce((hash, prop) => {
    callCounts[prop] = 0;
    lastArgs[prop] = [];

    hash[prop] = (...args) => {
      lastArgs[prop] = args;
      callCounts[prop]++;
    };

    return hash;
  }, {
    domain() {},
    range() {},
    rangeRound() {}
  });

  addOptionsToOrdinalScale(scale, [], [], {});
  assert.deepEqual(callCounts, {
    align: 0,
    padding: 0,
    paddingInner: 0,
    paddingOuter: 0
  });
  assert.deepEqual(lastArgs, {
    align: [],
    padding: [],
    paddingInner: [],
    paddingOuter: []
  });

  addOptionsToOrdinalScale(scale, [], [], {
    padding: 10
  });
  assert.deepEqual(callCounts, {
    align: 0,
    padding: 1,
    paddingInner: 0,
    paddingOuter: 0
  });
  assert.deepEqual(lastArgs, {
    align: [],
    padding: [10],
    paddingInner: [],
    paddingOuter: []
  });

  addOptionsToOrdinalScale(scale, [], [], {
    'padding-inner': 10
  });
  assert.deepEqual(callCounts, {
    align: 0,
    padding: 1,
    paddingInner: 1,
    paddingOuter: 0
  });
  assert.deepEqual(lastArgs, {
    align: [],
    padding: [10],
    paddingInner: [10],
    paddingOuter: []
  });

  addOptionsToOrdinalScale(scale, [], [], {
    'padding-outer': 10
  });
  assert.deepEqual(callCounts, {
    align: 0,
    padding: 1,
    paddingInner: 1,
    paddingOuter: 1
  });
  assert.deepEqual(lastArgs, {
    align: [],
    padding: [10],
    paddingInner: [10],
    paddingOuter: [10]
  });

  addOptionsToOrdinalScale(scale, [], [], {
    align: 0
  });
  assert.deepEqual(callCounts, {
    align: 1,
    padding: 1,
    paddingInner: 1,
    paddingOuter: 1
  });
  assert.deepEqual(lastArgs, {
    align: [0],
    padding: [10],
    paddingInner: [10],
    paddingOuter: [10]
  });
});

test('works without supporting paddingInner/Outer', function(assert) {
  let callCounts = {};
  let lastArgs = {};
  let scale = ['align', 'padding'].reduce((hash, prop) => {
    callCounts[prop] = 0;
    lastArgs[prop] = [];

    hash[prop] = (...args) => {
      lastArgs[prop] = args;
      callCounts[prop]++;
    };
    return hash;
  }, {});

  assert.throws(() => {
    addOptionsToOrdinalScale(scale, {
      'padding-inner': 10
    });
  }, 'padding inner without support throws');
  assert.deepEqual(callCounts, {
    align: 0,
    padding: 0
  });
  assert.deepEqual(lastArgs, {
    align: [],
    padding: []
  });

  assert.throws(() => {
    addOptionsToOrdinalScale(scale, {
      'padding-outer': 10
    });
  }, 'padding outer without support throws');
  assert.deepEqual(callCounts, {
    align: 0,
    padding: 0
  });
  assert.deepEqual(lastArgs, {
    align: [],
    padding: []
  });
});
