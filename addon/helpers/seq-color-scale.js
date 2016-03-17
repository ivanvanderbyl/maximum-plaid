import Ember from 'ember';
import d3Scale from 'ember-d3-scale';
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

  let scale = d3Scale[`scale${capType}`]();

  // If a scale was provided.
  if (!isEmpty(domain)) {
    scale.domain(domain);
  }

  return scale;
}

export default Ember.Helper.helper(seqColorScale);
