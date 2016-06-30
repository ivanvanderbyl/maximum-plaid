import { roundedRect } from 'dummy/helpers/rounded-rect';
import { module, test } from 'qunit';
import { max,min } from 'd3-array';
import { scaleLinear, scaleBand} from 'd3-scale';
module('Unit | Helper | rounded rect');

test('it returns a constructor for generating path data', function(assert) {
  let pathData = roundedRect([], { radius: '5' });
  assert.equal(typeof pathData, 'function', "It's a function");
});

test('computes a rounded rectangle path verically', function(assert) {
  let pathData = roundedRect(['5 5 0 0']);
  let xScale = scaleBand().domain([1,2,10,20,30]).rangeRound([0, 100]);
  let yScale = scaleLinear().domain([0, 100]).rangeRound([100,0]);

  let maxHeight = max(yScale.range());
  let x = (d) => xScale(d[0]);
  let width = () => xScale.bandwidth();
  let y = (d) => yScale(d[1]);
  let height = (d) => maxHeight - yScale(d[1]);

  let result = pathData(x, y, width, height)([10, 10]).toString();
  assert.deepEqual(result, 'M45,90L55,90Q60,90,60,95L60,100Q60,100,60,100L40,100Q40,100,40,100L40,95Q40,90,45,90Z', 'computed a valid path data');
});

test('computes a rounded rectangle path horizontally', function(assert) {
  let pathData = roundedRect(['5 5 0 0']);
  let xScale = scaleLinear().domain([0, 100]).rangeRound([100,0]);
  let yScale = scaleBand().domain([1,2,10,20,30]).rangeRound([0, 100]);

  let x = () => min(xScale.range());
  let width = (d) => xScale(d[0]);
  let y = (d) => yScale(d[1]);
  let height = yScale.bandwidth();

  let result = pathData(x, y, width, height)([10, 10]).toString();
  assert.deepEqual(result, 'M5,40L85,40Q90,40,90,45L90,60Q90,60,90,60L0,60Q0,60,0,60L0,45Q0,40,5,40Z', 'computed a valid path data');
});

