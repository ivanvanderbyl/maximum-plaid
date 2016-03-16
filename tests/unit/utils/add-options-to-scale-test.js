import addOptionsToScale from 'ember-d3-scale/utils/add-options-to-scale';
import { module, test } from 'qunit';

module('Unit | Utility | add options to scale');

// Replace this with your real tests.
test('it works', function(assert) {
  let callCounts = {};
  let scale = ['domain', 'rangeRound', 'range', 'clamp', 'nice'].reduce((hash, prop) => {
    callCounts[prop] = 0;
    hash[prop] = () => callCounts[prop]++;
    return hash;
  }, {});

  addOptionsToScale(scale, [], [], {});
  assert.deepEqual(callCounts, {
    domain: 1,
    rangeRound: 0,
    range: 1,
    clamp: 0,
    nice: 0
  });

  addOptionsToScale(scale, [], [], {
    round: true
  });
  assert.deepEqual(callCounts, {
    domain: 2,
    rangeRound: 1,
    range: 1,
    clamp: 0,
    nice: 0
  });

  addOptionsToScale(scale, [], [], {
    clamp: true
  });
  assert.deepEqual(callCounts, {
    domain: 3,
    rangeRound: 1,
    range: 2,
    clamp: 1,
    nice: 0
  });

  addOptionsToScale(scale, [], [], {
    nice: true
  });
  assert.deepEqual(callCounts, {
    domain: 4,
    rangeRound: 1,
    range: 3,
    clamp: 1,
    nice: 1
  });
});
