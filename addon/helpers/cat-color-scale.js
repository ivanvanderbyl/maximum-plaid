import Ember from 'ember';
import d3Proxy from '../utils/d3-proxy';
import guidDomainScale from '../utils/guid-domain-scale';
const {
  assert,
  isEmpty
} = Ember;

const WHITELIST = {
  '10': true,
  '20': true,
  '20b': true,
  '20c': true
};

export function catColorScale([type, domain], hash) {
  let capType = type.toString().toLowerCase();
  assert(`${type} is not a valid sequential color scale name`, capType in WHITELIST);

  let catScale = d3Proxy('scale', `category${capType}`);
  let scale = guidDomainScale(catScale());

  // If a scale was provided.
  if (!isEmpty(domain)) {
    scale.domain(domain);
  }

  return scale;
}

export default Ember.Helper.helper(catColorScale);
