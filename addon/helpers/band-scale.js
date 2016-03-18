import Ember from 'ember';
import d3Proxy from '../utils/d3-proxy';
import addOptionsToOrdinalScale from '../utils/add-options-to-ordinal-scale';
import guidDomainScale from '../utils/guid-domain-scale';

export function bandScale([domain, range], hash) {
  let bandScale = d3Proxy('scale', 'band');
  let scale = guidDomainScale(bandScale());
  addOptionsToOrdinalScale(scale, domain, range, hash, 'band');
  return scale;
}

export default Ember.Helper.helper(bandScale);
