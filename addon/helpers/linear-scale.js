import Ember from 'ember';
import { scaleLinear } from 'd3-scale';

export function linearScale([domain, range], hash) {
  let scale = scaleLinear().domain(domain);
  if (hash.round) {
    scale.rangeRound(range);
  }else{
    scale.range(range);
  }

  return scale;
}

export default Ember.Helper.helper(linearScale);
