import Ember from 'ember';
import { extent as arrayExtent } from 'd3-array';
const { get } = Ember;

export function extent([array, accessor], options) {

  if (!!accessor) {
    array = array.map((d) => get(d, accessor));
  }

  if (options && options.toZero === true) {
    array.push(0);
  }

  return arrayExtent(array);
}

export default Ember.Helper.helper(extent);
