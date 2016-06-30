import Ember from 'ember';
import { path } from 'd3-path';
import { max } from 'd3-array';
import box from '../utils/box-expression';

// Borrowed from d3 v3 core.
// @private
function functor(v) {
  return typeof v === 'function' ? v : function() {
    return v;
  };
}

export function roundedRect(params, hash) {
  if (!hash) {
    hash = {};
  }

  let coords = box(hash.radius || params[0] || '0 0 0 0');

  return function(x, y, width, height) {
    let p = path();

    return function(d) {
      let xVal = functor(x)(d);
      let yVal = functor(y)(d);
      let heightVal = functor(height)(d);
      let widthVal = functor(width)(d);

      let radius = {
        tl: coords.top,
        tr: coords.right,
        br: coords.bottom,
        bl: coords.left
      };

      p.moveTo(xVal + radius.tl, yVal);
      p.lineTo(xVal + widthVal - radius.tr, yVal);
      p.quadraticCurveTo(xVal + widthVal, yVal, xVal + widthVal, yVal + radius.tr);
      p.lineTo(xVal + widthVal, yVal + heightVal - radius.br);
      p.quadraticCurveTo(xVal + widthVal, yVal + heightVal, xVal + widthVal - radius.br, yVal + heightVal);
      p.lineTo(xVal + radius.bl, yVal + heightVal);
      p.quadraticCurveTo(xVal, yVal + heightVal, xVal, yVal + heightVal - radius.bl);
      p.lineTo(xVal, yVal + radius.tl);
      p.quadraticCurveTo(xVal, yVal, xVal + radius.tl, yVal);

      p.closePath();
      return p;
    };
  };
}

export default Ember.Helper.helper(roundedRect);
