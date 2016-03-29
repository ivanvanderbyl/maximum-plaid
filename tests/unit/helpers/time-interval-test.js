import {
  timeSecond,
  timeMinute,
  timeDay,
  timeWeek,
  timeMonth,
  timeYear,
  timeSunday,
  timeMonday,
  timeTuesday,
  timeWednesday,
  timeThursday,
  timeFriday,
  timeSaturday
} from 'd3-time';
import { timeInterval } from 'dummy/helpers/time-interval';
import { module, test } from 'qunit';

module('Unit | Helper | time interval');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.equal(timeInterval(['second']), timeSecond);
  assert.equal(timeInterval(['Second']), timeSecond);
  assert.equal(timeInterval(['SECOND']), timeSecond);
  assert.equal(timeInterval(['sEcOnD']), timeSecond);

  assert.equal(timeInterval(['Minute']), timeMinute);
  assert.equal(timeInterval(['Day']), timeDay);
  assert.equal(timeInterval(['Week']), timeWeek);
  assert.equal(timeInterval(['Month']), timeMonth);
  assert.equal(timeInterval(['Year']), timeYear);
  assert.equal(timeInterval(['Sunday']), timeSunday);
  assert.equal(timeInterval(['Monday']), timeMonday);
  assert.equal(timeInterval(['Tuesday']), timeTuesday);
  assert.equal(timeInterval(['Wednesday']), timeWednesday);
  assert.equal(timeInterval(['Thursday']), timeThursday);
  assert.equal(timeInterval(['Friday']), timeFriday);
  assert.equal(timeInterval(['Saturday']), timeSaturday);

  assert.throws(() => {
    timeInterval(['Hamilton']);
  }, 'throws on a non-existent interval type');
});
