import Ember from 'ember';
import d3Proxy from '../utils/d3-proxy';
import addOptionsToScale from '../utils/add-options-to-scale';

export function linearScale([domain, range], hash) {
  let scale = d3Proxy('scale', 'linear')();
  addOptionsToScale(scale, domain, range, hash);
  return scale;
}

export default Ember.Helper.helper(linearScale);
