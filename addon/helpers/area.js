import Ember from 'ember';
import box from '../utils/box-expression';

export function area([width, height], hash) {
  let margin = hash.margin ? box(hash.margin) : { top: 0, right: 0, bottom: 0, left: 0 };

  return {
    top: margin.top,
    left: margin.left,
    bottom: height - margin.top,
    right: width - margin.right,
    height: height - margin.top - margin.bottom,
    width: width - margin.left - margin.right,
    outerWidth: width,
    outerHeight: height,
    margin: {
      top: margin.top,
      left: margin.left,
      bottom: margin.bottom,
      right: margin.right
    }
  };
}

export default Ember.Helper.helper(area);
