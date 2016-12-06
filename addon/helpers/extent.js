import Ember from 'ember';
import { extent as arrayExtent, max } from 'd3-array';
const { Helper, get, isPresent } = Ember;

export function extent([array, accessor], options) {

  if (isPresent(accessor)) {
    array = array.map((d) => get(d, accessor));
  }

  if (options && options.toZero === true) {
    return [0, max(array)];
  } else {
    return arrayExtent(array);
  }
}

export default Helper.helper(extent);
