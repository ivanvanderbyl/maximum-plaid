import Ember from 'ember';
import d3Proxy from '../utils/d3-proxy';
import addOptionsToOrdinalScale from '../utils/add-options-to-ordinal-scale';
import guidDomainScale from '../utils/guid-domain-scale';

export function pointScale([domain, range], hash) {
  let scale = guidDomainScale(d3Proxy('scale', 'point')());
  addOptionsToOrdinalScale(scale, domain, range, hash, 'point');
  return scale;
}

export default Ember.Helper.helper(pointScale);
