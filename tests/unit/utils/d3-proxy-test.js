import d3Proxy, { d3NameV3, d3NameV4, emptyCache } from 'ember-d3-scale/utils/d3-proxy';
import { module, test } from 'qunit';

module('Unit | Utility | d3 proxy', {
  beforeEach() {
    emptyCache();
  },
  afterEach() {
    emptyCache();
  }
});

// Replace this with your real tests.
test('it works with the modular type d3', function(assert) {
  let old_d3_scale = window.d3_scale;
  window.d3_scale = {
    scaleBand: 1
  };

  assert.equal(d3Proxy('scale', 'band'), 1, 'the lookup works');

  window.d3_scale.scaleBand = 2;
  assert.equal(d3Proxy('scale', 'band'), 1, 'the cache works');

  emptyCache();
  assert.equal(d3Proxy('scale', 'band'), 2, 'clearing the cache works');

  window.d3_scale = old_d3_scale;
});

test('it works with the global type d3', function(assert) {
  let old_d3_scale = window.d3_scale;
  let old_d3 = window.d3;
  window.d3_scale = null;
  window.d3 = {
    scale: {
      ordinal: 1
    }
  };

  assert.equal(d3Proxy('scale', 'band'), 1, 'the lookup works');

  window.d3.scale.ordinal = 2;
  assert.equal(d3Proxy('scale', 'band'), 1, 'the cache works');

  emptyCache();
  assert.equal(d3Proxy('scale', 'band'), 2, 'clearing the cache works');

  window.d3 = old_d3;
  window.d3_scale = old_d3_scale;
});

test('convert namepsace and key to v4 naming', function(assert) {
  assert.equal(d3NameV4('scale', 'band'), 'd3_scale.scaleBand');
  assert.equal(d3NameV4('scale', 'category10'), 'd3_scale.scaleCategory10');
  assert.equal(d3NameV4('time', 'milliseconds'), 'd3_time.timeMilliseconds');
});

test('convert namepsace and key to v3 naming', function(assert) {
  assert.equal(d3NameV3('scale', 'band'), 'd3.scale.band');
  assert.equal(d3NameV3('scale', 'category10'), 'd3.scale.category10');
  assert.equal(d3NameV3('time', 'seconds'), 'd3.time.seconds');
});
