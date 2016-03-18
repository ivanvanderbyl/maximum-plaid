import guidDomainScale from 'ember-d3-scale/utils/guid-domain-scale';
import d3Proxy from 'ember-d3-scale/utils/d3-proxy';
import { module, test } from 'qunit';

module('Unit | Utility | guid domain scale');

// Replace this with your real tests.
test('it uses guids for domain, but otherwise feature parity', function(assert) {
  let stdDomain = ['a', 'b', 'c', 'd'];
  let objDomain = [{}, {}, {}, {}];

  let bandScale = d3Proxy('scale', 'band');
  let stdScale = bandScale();
  let objScale = guidDomainScale(bandScale());

  stdScale.domain(stdDomain);
  objScale.domain(objDomain);

  stdScale.range([0, 100]);
  objScale.range([0, 100]);

  assert.ok(stdScale, 'scale is created');
  assert.ok(objScale, 'scale is created');
  assert.equal(typeof stdScale, 'function');
  assert.equal(typeof objScale, 'function');

  assert.deepEqual(stdDomain, stdScale.domain(), 'domain identity');
  assert.deepEqual(objDomain, objScale.domain(), 'domain identity');

  assert.equal(stdScale(stdDomain[0]), objScale(objDomain[0]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[2]), objScale(objDomain[2]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[3]), objScale(objDomain[3]), 'scale function is equivalent');

  if (stdScale.padding) {
    stdScale.padding(0.5);
    objScale.padding(0.5);
  } else {
    stdScale.rangeBands([0, 100], 0.5);
    objScale.rangeBands([0, 100], 0.5);
  }

  assert.equal(stdScale(stdDomain[0]), objScale(objDomain[0]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[2]), objScale(objDomain[2]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[3]), objScale(objDomain[3]), 'scale function is equivalent');

  if (stdScale.padding) {
    stdScale.rangeRound([0, 97]);
    objScale.rangeRound([0, 97]);
  } else {
    stdScale.rangeRoundBands([0, 100], 0.5);
    objScale.rangeRoundBands([0, 100], 0.5);
  }

  assert.equal(stdScale(stdDomain[0]), objScale(objDomain[0]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[2]), objScale(objDomain[2]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[3]), objScale(objDomain[3]), 'scale function is equivalent');
});
