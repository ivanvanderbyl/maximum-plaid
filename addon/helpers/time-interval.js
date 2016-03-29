import {
  timeMillisecond,
  timeSecond,
  timeMinute,
  timeHour,
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
import Ember from 'ember';
const {
  assert,
  get,
  String: { capitalize }
} = Ember;
const INTERVALS = {
  timeMillisecond,
  timeSecond,
  timeMinute,
  timeHour,
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
};

export function timeInterval([intervalName]) {
  let interval = get(INTERVALS, `time${capitalize(intervalName.toLowerCase())}`);
  assert(`${intervalName} is not a valid interval name.`, !!interval);
  return interval;
}

export default Ember.Helper.helper(timeInterval);
