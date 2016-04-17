import Ember from 'ember';
import { timeFormat } from 'd3-time-format';

export function relativeTickFormat(params/*, hash*/) {
  let [epoch] = params;

  let formatTime = timeFormat("%B %d, %Y");
  return formatTime;
}

export default Ember.Helper.helper(relativeTickFormat);
