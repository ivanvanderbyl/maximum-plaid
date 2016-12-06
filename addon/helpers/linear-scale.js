import Ember from 'ember';
import { scaleLinear } from 'd3-scale';
const { Helper } = Ember;

export function linearScale(params, hash = {}) {
  params = params.slice();
  let [domain, range] = params;
  hash = Object.assign({}, hash);

  let scale = scaleLinear().domain(domain);
  if (hash && hash.round) {
    scale.rangeRound(range);
  } else {
    scale.range(range);
  }

  return scale;
}

export default Helper.helper(linearScale);
