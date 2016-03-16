import guidDomainScale from 'ember-d3-scale/utils/guid-domain-scale';
import d3Scale from 'ember-d3-scale';
import { module, test } from 'qunit';

module('Unit | Utility | guid domain scale');

// Replace this with your real tests.
test('it uses guids for domain, but otherwise feature parity', function(assert) {
  let stdDomain = ['a', 'b', 'c', 'd'];
  let objDomain = [{}, {}, {}, {}];

  let stdScale = d3Scale.scaleBand();
  let objScale = guidDomainScale(d3Scale.scaleBand());

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

  stdScale.padding(0.5);
  objScale.padding(0.5);

  assert.equal(stdScale(stdDomain[0]), objScale(objDomain[0]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[2]), objScale(objDomain[2]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[3]), objScale(objDomain[3]), 'scale function is equivalent');

  stdScale.rangeRound([0, 97]);
  objScale.rangeRound([0, 97]);

  assert.equal(stdScale(stdDomain[0]), objScale(objDomain[0]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[2]), objScale(objDomain[2]), 'scale function is equivalent');
  assert.equal(stdScale(stdDomain[3]), objScale(objDomain[3]), 'scale function is equivalent');
});
