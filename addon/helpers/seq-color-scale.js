import Ember from 'ember';
import {
  scaleViridis,
  scaleInferno,
  scaleMagma,
  scalePlasma,
  scaleWarm,
  scaleCool,
  scaleRainbow,
  scaleCubehelix
} from 'd3-scale';
const {
  get,
  assert,
  isEmpty,
  String: { capitalize }
} = Ember;

const SCALES = {
  scaleViridis,
  scaleInferno,
  scaleMagma,
  scalePlasma,
  scaleWarm,
  scaleCool,
  scaleRainbow,
  scaleCubehelix
};

export function seqColorScale([type, domain], hash) {
  let capType = `scale${capitalize(type.toString().toLowerCase())}`;
  assert(`${type} is not a valid sequential color scale name`, capType in SCALES);

  let scaleType = get(SCALES, capType);

  let scale = scaleType();

  // If a scale was provided.
  if (!isEmpty(domain)) {
    scale.domain(domain);
  }

  return scale;
}

export default Ember.Helper.helper(seqColorScale);
