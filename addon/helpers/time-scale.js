import Ember from 'ember';
import d3Proxy from '../utils/d3-proxy';
import addOptionsToScale from '../utils/add-options-to-scale';

export function timeScale([domain, range], hash) {
  let scale = d3Proxy('scale', 'time')();
  addOptionsToScale(scale, domain, range, hash);
  return scale;
}

export default Ember.Helper.helper(timeScale);
