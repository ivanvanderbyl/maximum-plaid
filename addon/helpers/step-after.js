import Ember from 'ember';
import { curveStepAfter } from 'd3-shape';

export function stepAfter() {
  return curveStepAfter;
}

export default Ember.Helper.helper(stepAfter);
