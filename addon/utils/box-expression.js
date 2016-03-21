import Ember from 'ember';

export default function box(expr) {
  if (typeof expr !== 'object') {
    expr = String(expr).split(/\s+/).map(Number);
  } else {
    return [ 'left', 'right', 'top', 'bottom' ].reduce((accum, dir) => {
      accum[dir] = Number(expr[dir]) || 0;

      return accum;
    }, {});
  }

  Ember.assert('Box expr must be have 1-4 numbers', !expr.filter(isNaN).length);

  switch (expr.length) {
    // 1 value = all four sides
    case 1: return { left: expr[0], right: expr[0], top: expr[0], bottom: expr[0] };
    // 2 values = top/bottom,  right/left
    case 2: return { left: expr[1], right: expr[1], top: expr[0], bottom: expr[0] };
    // 3 values = top, both sides, bottom
    case 3: return { left: expr[1], right: expr[1], top: expr[0], bottom: expr[2] };
    // 4 values = top, right, bottom, left
    case 4: return { left: expr[3], right: expr[1], top: expr[0], bottom: expr[2] };
  }

  return {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  };
}
