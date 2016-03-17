import { d3Time } from 'ember-d3-scale';
import { timeInterval } from 'dummy/helpers/time-interval';
import { module, test } from 'qunit';

module('Unit | Helper | time interval');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.equal(timeInterval(['second']), d3Time.timeSecond);
  assert.equal(timeInterval(['Second']), d3Time.timeSecond);
  assert.equal(timeInterval(['SECOND']), d3Time.timeSecond);
  assert.equal(timeInterval(['sEcOnD']), d3Time.timeSecond);

  assert.equal(timeInterval(['Millisecond']), d3Time.timeMillisecond);
  assert.equal(timeInterval(['Minute']), d3Time.timeMinute);
  assert.equal(timeInterval(['Day']), d3Time.timeDay);
  assert.equal(timeInterval(['Week']), d3Time.timeWeek);
  assert.equal(timeInterval(['Month']), d3Time.timeMonth);
  assert.equal(timeInterval(['Year']), d3Time.timeYear);
  assert.equal(timeInterval(['Sunday']), d3Time.timeSunday);
  assert.equal(timeInterval(['Monday']), d3Time.timeMonday);
  assert.equal(timeInterval(['Tuesday']), d3Time.timeTuesday);
  assert.equal(timeInterval(['Wednesday']), d3Time.timeWednesday);
  assert.equal(timeInterval(['Thursday']), d3Time.timeThursday);
  assert.equal(timeInterval(['Friday']), d3Time.timeFriday);
  assert.equal(timeInterval(['Saturday']), d3Time.timeSaturday);

  assert.throws(() => {
    timeInterval(['Hamilton']);
  }, 'throws on a non-existent interval type');
});
