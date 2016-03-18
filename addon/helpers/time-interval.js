import d3Proxy from '../utils/d3-proxy';
import Ember from 'ember';
const { assert } = Ember;

export function timeInterval([intervalName]) {
  let interval = d3Proxy('time', intervalName.toLowerCase());
  assert(`${intervalName} is not a valid interval name.`, !!interval);
  return interval;
}

export default Ember.Helper.helper(timeInterval);
