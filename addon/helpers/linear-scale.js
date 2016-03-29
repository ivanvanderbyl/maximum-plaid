import Ember from 'ember';
import { scaleLinear } from 'd3-scale';
import addOptionsToScale from '../utils/add-options-to-scale';

export function linearScale([domain, range], hash) {
  let scale = scaleLinear();
  addOptionsToScale(scale, domain, range, hash);
  return scale;
}

export default Ember.Helper.helper(linearScale);
