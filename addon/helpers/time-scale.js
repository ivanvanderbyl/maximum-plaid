import Ember from 'ember';
import addOptionsToScale from '../utils/add-options-to-scale';
import d3Scale from 'ember-d3-scale';

export function timeScale([domain, range], hash) {
  let scale = d3Scale.scaleTime();
  addOptionsToScale(scale, domain, range, hash);
  return scale;
}

export default Ember.Helper.helper(timeScale);
