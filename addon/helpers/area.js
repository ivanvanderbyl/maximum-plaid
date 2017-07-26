import Ember from 'ember';
import box from '../utils/box-expression';
const { Helper } = Ember;

export function area(params, hash) {
  let [width, height] = params.slice();
  hash = Object.assign({}, hash);
  let margin = hash.margin ? box(hash.margin) : { top: 0, right: 0, bottom: 0, left: 0 };

  return {
    top: margin.top,
    left: margin.left,
    bottom: height - margin.bottom,
    right: width - margin.right,
    height: height - margin.top - margin.bottom,
    width: width - margin.left - margin.right,
    outerHeight: height,
    outerWidth: width,

    margin: {
      top: margin.top,
      right: margin.right,
      bottom: margin.bottom,
      left: margin.left
    }
  };
}

export default Helper.helper(area);
