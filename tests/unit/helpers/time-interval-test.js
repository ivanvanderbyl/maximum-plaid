import d3Proxy from 'ember-d3-scale/utils/d3-proxy';
import { timeInterval } from 'dummy/helpers/time-interval';
import { module, test } from 'qunit';

module('Unit | Helper | time interval');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.equal(timeInterval(['second']), d3Proxy('time', 'second'));
  assert.equal(timeInterval(['Second']), d3Proxy('time', 'second'));
  assert.equal(timeInterval(['SECOND']), d3Proxy('time', 'second'));
  assert.equal(timeInterval(['sEcOnD']), d3Proxy('time', 'second'));

  assert.equal(timeInterval(['Minute']), d3Proxy('time', 'minute'));
  assert.equal(timeInterval(['Day']), d3Proxy('time', 'day'));
  assert.equal(timeInterval(['Week']), d3Proxy('time', 'week'));
  assert.equal(timeInterval(['Month']), d3Proxy('time', 'month'));
  assert.equal(timeInterval(['Year']), d3Proxy('time', 'year'));
  assert.equal(timeInterval(['Sunday']), d3Proxy('time', 'sunday'));
  assert.equal(timeInterval(['Monday']), d3Proxy('time', 'monday'));
  assert.equal(timeInterval(['Tuesday']), d3Proxy('time', 'tuesday'));
  assert.equal(timeInterval(['Wednesday']), d3Proxy('time', 'wednesday'));
  assert.equal(timeInterval(['Thursday']), d3Proxy('time', 'thursday'));
  assert.equal(timeInterval(['Friday']), d3Proxy('time', 'friday'));
  assert.equal(timeInterval(['Saturday']), d3Proxy('time', 'saturday'));

  assert.throws(() => {
    timeInterval(['Hamilton']);
  }, 'throws on a non-existent interval type');
});
