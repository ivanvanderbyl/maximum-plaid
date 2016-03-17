import Ember from 'ember';
import guidDomainScale from '../utils/guid-domain-scale';
import d3Scale from 'ember-d3-scale';
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

  let scale = guidDomainScale(d3Scale[`scaleCategory${capType}`]());

  // If a scale was provided.
  if (!isEmpty(domain)) {
    scale.domain(domain);
  }

  return scale;
}

export default Ember.Helper.helper(catColorScale);
