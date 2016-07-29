import { voronoi } from 'dummy/helpers/voronoi';
import { module, test } from 'qunit';
import { poissonDiscSampler } from 'dummy/helpers/poisson-disc-sampler';

module('Unit | Helper | voronoi');

test('it can compute voronoi polygons', function(assert) {
  let subject = voronoi([[[200,200], [760, 300]]], { size: [960, 500] });

  assert.deepEqual(subject, [
    [[435.3571428571429, 500], [524.6428571428572, 0], [0, 0], [0, 500]],
    [[524.6428571428572, 0], [435.3571428571429, 500], [960, 500], [960, 0]]
  ], 'generates data for polygons');
});

test('computing voronoi polygons from poissonDiscSampler', function(assert) {
  let width = 960;
  let height = 500;
  let radius = 30;

  let sampler = poissonDiscSampler([width + radius * 2, height + radius * 2, radius]);
  let samples = [];
  let sample;

  while (sample = sampler()) {
    samples.push([sample[0] - radius, sample[1] - radius]);
  }

  let subject = voronoi([samples], { size: [960, 500] });

  assert.deepEqual(subject, [], 'message');
});
