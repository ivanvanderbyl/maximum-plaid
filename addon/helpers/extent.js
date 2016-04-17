import Ember from 'ember';
import { extent as arrayExtent } from 'd3-array';
const { get } = Ember;

export function extent([array, accessor]) {
  if (!!accessor) {
    array = array.map((d) => get(d, accessor));
  }
  return arrayExtent(array);
}

export default Ember.Helper.helper(extent);
