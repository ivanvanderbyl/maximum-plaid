import Ember from 'ember';
import { scaleBand } from 'd3-scale';
import addOptionsToOrdinalScale from '../utils/add-options-to-ordinal-scale';
import guidDomainScale from '../utils/guid-domain-scale';

export function bandScale([domain, range], hash) {
  let scale = guidDomainScale(scaleBand());
  addOptionsToOrdinalScale(scale, domain, range, hash, 'band');
  return scale;
}

export default Ember.Helper.helper(bandScale);
