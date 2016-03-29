import Ember from 'ember';
import {
  scaleCategory10,
  scaleCategory20b,
  scaleCategory20c,
  scaleCategory20
} from 'd3-scale';
import guidDomainScale from '../utils/guid-domain-scale';
const {
  get,
  assert,
  isEmpty
} = Ember;
const SCALES = {
  scaleCategory10,
  scaleCategory20b,
  scaleCategory20c,
  scaleCategory20
};

const WHITELIST = {
  '10': true,
  '20': true,
  '20b': true,
  '20c': true
};

export function catColorScale([type, domain], hash) {
  let capType = type.toString().toLowerCase();
  assert(`${type} is not a valid sequential color scale name`, capType in WHITELIST);

  let catScale = get(SCALES, `scaleCategory${capType}`);
  let scale = guidDomainScale(catScale());

  // If a scale was provided.
  if (!isEmpty(domain)) {
    scale.domain(domain);
  }

  return scale;
}

export default Ember.Helper.helper(catColorScale);
