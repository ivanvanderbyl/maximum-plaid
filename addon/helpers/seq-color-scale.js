import Ember from 'ember';
import d3Proxy from '../utils/d3-proxy';
const {
  assert,
  isEmpty,
  String: { capitalize }
} = Ember;

const WHITELIST = {
  Viridis: true,
  Inferno: true,
  Magma: true,
  Plasma: true,
  Warm: true,
  Cool: true,
  Rainbow: true,
  Cubehelix: true
};

export function seqColorScale([type, domain], hash) {
  let capType = capitalize(type.toString().toLowerCase());
  assert(`${type} is not a valid sequential color scale name`, capType in WHITELIST);

  let scaleType = d3Proxy('scale', capType);
  assert('Sequential Color scales are not available in D3 v3', !!scaleType);

  let scale = scaleType();

  // If a scale was provided.
  if (!isEmpty(domain)) {
    scale.domain(domain);
  }

  return scale;
}

export default Ember.Helper.helper(seqColorScale);
