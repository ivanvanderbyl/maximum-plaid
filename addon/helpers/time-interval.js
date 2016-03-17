import { d3Time } from 'ember-d3-scale';
import Ember from 'ember';
const {
  assert,
  String: { capitalize }
} = Ember;

export function timeInterval([intervalName]) {
  let key = `time${capitalize(intervalName.toString().toLowerCase())}`;
  assert(`${intervalName} is not a valid interval name.`, !!d3Time[key]);
  return d3Time[key];
}

export default Ember.Helper.helper(timeInterval);
