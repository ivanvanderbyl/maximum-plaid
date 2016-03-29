import Ember from 'ember';
import { scalePoint } from 'd3-scale';
import addOptionsToOrdinalScale from '../utils/add-options-to-ordinal-scale';
import guidDomainScale from '../utils/guid-domain-scale';

export function pointScale([domain, range], hash) {
  let scale = guidDomainScale(scalePoint());
  addOptionsToOrdinalScale(scale, domain, range, hash, 'point');
  return scale;
}

export default Ember.Helper.helper(pointScale);
